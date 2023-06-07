import { ReactElement, useCallback, useEffect, useState } from 'react';

import { VaccineApiCalls } from '../../../apiCalls/vaccineApiCalls';
import SubmitFormButton from '../../../components/Buttons/SubmitFormButton';
import FormDiv from '../../../components/Form/FormDiv';

import CardTitleCompnenet from '../../../components/General/CardTitle';
import { AnimalApiCalls } from '../../../apiCalls/animalApiCalls';
import VaccineSpeciesSelect from './VaccineSpeciesSelect';
import VaccineCoreCheck from './VaccineCoreCheck';

function VaccineForm({
	setServerError,
	setEdited,
}: {
	setServerError;
	setEdited;
}): ReactElement {
	const [vaccineType, setVaccineType] = useState<{
		VaccineType: string;
		Species: string | null;
		Core: boolean;
	}>({ VaccineType: '', Species: '', Core: false });

	const [error, setError] = useState({ VaccineType: '', Species: '' });
	const vaccineApiCalls = new VaccineApiCalls();
	const [speciesList, setSpeciesList] = useState<string[]>([]);
	const animalApiCalls = new AnimalApiCalls();
	useEffect(() => {
		const loadAnimalSpecies = async () => {
			try {
				const response = await animalApiCalls.getAnimalSpecies();
				if (response) {
					if (response.status == 200) {
						setSpeciesList(await response.json());
					} else setServerError(true);
				}
			} catch (error) {
				console.log(error);
				setServerError(true);
			}
		};
		loadAnimalSpecies();
	}, []);
	const onChange = useCallback((e): void => {
		e.preventDefault();
		const { name, value } = e.target;

		setVaccineType((prev) => ({
			...prev,
			[name]: value,
		}));
	}, []);

	const onCheck = useCallback((): void => {
		setVaccineType((prev) => ({
			...prev,
			Core: !vaccineType.Core,
		}));
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		vaccineType.Species === 'Ogolna'
			? setVaccineType((prev) => ({ ...prev, Species: null }))
			: '';

		if (validateForm()) {
			setDisabledButton(true);
			try {
				const response = await vaccineApiCalls.registerVaccine(vaccineType);
				if (response) {
					setDisabledButton(false);

					if (response.status == 201) {
						setEdited('Tr');
					}
					if (response.status == 409) {
						setError((prev) => ({
							...prev,
							VaccineType: 'Już instnieje',
						}));
					} else {
						setServerError(true);
					}
				}
			} catch (error) {
				setServerError(true);
			}
		}
	};

	const validateForm = (): boolean => {
		let isValid = true;

		setError({
			Species: '',
			VaccineType: '',
		});
		for (const [name, value] of Object.entries(vaccineType)) {
			if (value === '' || value === undefined) {
				console.log(value);
				setError((prev) => ({
					...prev,
					[name]: 'Puste pole',
				}));
				isValid = false;
			}
		}

		return isValid;
	};
	const [disabledButton, setDisabledButton] = useState(false);
	return (
		<div className="card card-body shadow">
			<CardTitleCompnenet label="Nowa szczepionka" />
			<form className="row" onSubmit={handleSubmit}>
				<div className="col-12">
					<FormDiv
						label={'Nazwa szczepionki'}
						type={undefined}
						error={error.VaccineType}
						name={'VaccineType'}
						onChange={onChange}
						value={undefined}
						min={''}
						placeholder={''}
						disabled={undefined}
					/>
				</div>
				<div className="col-12">
					<VaccineSpeciesSelect
						error={error}
						speciesList={speciesList}
						onChange={onChange}
					/>
				</div>
				<div className="col-12">
					<VaccineCoreCheck onCheck={onCheck} />
				</div>
				<div className="col-12 mt-2">
					<SubmitFormButton label="Dodaj" disable={disabledButton} />
				</div>
			</form>
		</div>
	);
}

export default VaccineForm;
