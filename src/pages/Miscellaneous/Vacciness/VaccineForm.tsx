import { ReactElement, useCallback, useEffect, useState } from 'react';

import { VaccineApiCalls } from '../../../apiCalls/vaccineApiCalls';
import SubmitFormButton from '../../../components/Buttons/SubmitFormButton';
import FormDiv from '../../../components/Form/FormDiv';

import CardTitleCompnenet from '../../../components/General/CardTitle';
import { AnimalApiCalls } from '../../../apiCalls/animalApiCalls';
import VaccineSpeciesSelect from './VaccineSpeciesSelect';
import VaccineCoreCheck from './VaccineCoreCheck';
import { isEmpty } from '../../../utils/validatiorHelper';

function VaccineForm({
	setServerError,
	setEdited,
	edited,
}: {
	setServerError;
	setEdited;
	edited;
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
				console.log(vaccineType);
				const response = await vaccineApiCalls.registerVaccine(vaccineType);
				if (response) {
					setDisabledButton(false);
					const data = await response.json();

					setDisabledButton(false);

					if (response.status == 201) {
						window.location.reload();
					} else if (response.status == 409) {
						setError((prev) => ({
							...prev,
							VaccineType: 'Już istnieje',
						}));
					} else {
						setServerError(true);
					}
				}
			} catch (error) {
				setDisabledButton(false);
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
			if (isEmpty(value)) {
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
