import { useState, useEffect, ReactElement } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimalApiCalls } from '../../../apiCalls/animalApiCalls';
import BreadCrumbComponent from '../../../components/Navigation/BreadCrumbComponent';
import { getCurrentUser } from '../../../utils/authHelper';
import { isOwner } from '../../../utils/userType';
import ServerErrorInfoComponenet from '../../../components/InfoBanners/ServerErrorInfoBannerComponent';
import PhotoForm from '../../../components/Form/PhotoForm';
import AnimalMainInfo from './Components/AnimalMainInfo';
import UpperPageStripe from '../../../components/General/UpperPageStripe';
import { isEmpty } from '../../../utils/validatiorHelper';

export interface IAnimalForm {
	Name: string | undefined;
	BirthDate: string | undefined;

	OwnerId: string | undefined;
	Sex: string | undefined;

	AnimalTypeId: string | undefined;
	ProfileImage: undefined | null | any;
}

function AnimalRegister(): ReactElement {
	const location = useLocation();

	const [editForm, setEditForm] = useState(false);

	const [animalId, setAnimalId] = useState('');

	const [animal, setAnimal] = useState<IAnimalForm>({
		Name: '',
		BirthDate: ' - - ',

		OwnerId: '',
		Sex: undefined,

		AnimalTypeId: '',
		ProfileImage: null,
	});

	const [error, setError] = useState<{
		Name: string;
		BirthDate: string;
		Weight: string;
		AnimalTypeId: string;
		Sex: string;
		OwnerId: string;
	}>({
		Name: '',
		BirthDate: '',
		Weight: '',
		AnimalTypeId: '',
		Sex: '',
		OwnerId: '',
	});

	const [serverError, setServerError] = useState(false);

	let navigate = useNavigate();

	const animalApiCalls = new AnimalApiCalls();

	useEffect(() => {
		if (isOwner()) {
			setAnimal((prev) => ({
				...prev,
				OwnerId: getCurrentUser().userTypeId,
			}));
		}

		const loadAnimalEditFrom = async () => {
			const state = location.state as { AnimalId: string };
			if (state != null) {
				try {
					setEditForm(true);
					setAnimalId(state.AnimalId);
					const response = await animalApiCalls.getAnimalById(state.AnimalId);
					if (response) {
						if (response.status == 200) {
							const data = await response.json();
							setAnimal((prev) => ({
								...prev,
								Name: data.Name,
								BirthDate: data.BirthDate,

								AnimalTypeId: data.AnimalTypeId,
								OwnerId: data.OwnerId,
								ProfileImage: data.ProfileImage,
								Sex: data.Sex,
							}));
						}
						if (response.status == 500) {
							setServerError(true);
						}
					}
				} catch (error) {
					console.log(error);
					setServerError(true);
				}
			}
		};

		loadAnimalEditFrom();
	}, []);

	const onChange = (e): void => {
		const { name, value } = e.target;
		let newValue = value;
		if (newValue == 'false') {
			newValue = false;
		}
		if (newValue == 'true') {
			newValue = true;
		}

		setAnimal((prev) => ({
			...prev,
			[name]: newValue,
		}));
	};

	const handleDateChange = (e): void => {
		console.log(e);
		setAnimal((prev) => ({
			...prev,
			BirthDate: e,
		}));
	};

	const validateForm = (): boolean => {
		let isValid = true;

		for (const [name, value] of Object.entries(animal)) {
			error[name] = '';

			if (isEmpty(value)) {
				if (name != 'ProfileImage') {
					setError((prevErrors) => ({
						...prevErrors,
						[name]: 'Puste pole',
					}));
					isValid = false;
				}
			}
			if (name == 'BirthDate') {
				const datearr: string[] = value.split('-');
				datearr.forEach((element) => {
					if (element == ' ') {
						setError((prevErrors) => ({
							...prevErrors,
							[name]: 'Puste pole',
						}));
						isValid = false;
					}
				});
			}
		}
		return isValid;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (validateForm()) {
			try {
				setDisabledButton(true);
				let newAnimal;

				let response;

				if (editForm) {
					newAnimal = { ...animal, AnimalId: animalId };

					response = await animalApiCalls.updateAnimal(newAnimal);
				} else {
					newAnimal = animal;
					response = await animalApiCalls.registerAnimal(newAnimal);
				}

				if (response) {
					setDisabledButton(false);

					if (response.status === 201) {
						const data = await response.json();
						if (!editForm) {
							navigate('/animals', { state: { id: data.newId } });
						} else {
							navigate(`/animals/${animalId}`, { state: { id: data.newId } });
						}
					}
					if (response.status == 500) {
						setServerError(true);
					}
				}
			} catch (error) {
				setDisabledButton(true);
				console.log(error);
				setServerError(true);
			}
		}
	};

	const setPhoto = (preview): void => {
		console.log(preview);
		setAnimal((prev) => ({
			...prev,
			ProfileImage: preview,
		}));
	};

	const handleOwnerChange = (e): void => {
		const value = e.value;
		setAnimal((prev) => ({
			...prev,
			OwnerId: value,
		}));
	};

	const handleAnimalTypeChange = (e): void => {
		console.log(e);
		const value = e.value;
		setAnimal((prev) => ({
			...prev,
			AnimalTypeId: value,
		}));
	};

	const [disabledButton, setDisabledButton] = useState(false);
	return (
		<div>
			<UpperPageStripe
				bredCrumbs={
					editForm ? (
						<BreadCrumbComponent
							elements={[
								{ label: 'Zwierzęta', active: false, link: '/animals' },
								{
									label: 'Profil',
									active: false,
									link: `animals/${animalId}`,
								},
								{ label: 'Edycja', active: true, link: '' },
							]}
						/>
					) : (
						<BreadCrumbComponent
							elements={[
								{ label: 'Zwierzęta', active: false, link: '/animals' },

								{ label: 'Rejestracja', active: true, link: '' },
							]}
						/>
					)
				}
			>
				{}
			</UpperPageStripe>
			<form
				className="container "
				onSubmit={handleSubmit}
				noValidate
				style={{}}
			>
				<ServerErrorInfoComponenet serverError={serverError} />

				<div className="row just">
					<div className="col-lg-4">
						<PhotoForm
							setPhoto={setPhoto}
							preview={animal.ProfileImage}
							editForm={editForm}
						/>
					</div>

					<div className="col-lg-4">
						<AnimalMainInfo
							handleChange={onChange}
							error={error}
							animal={animal}
							editForm={editForm}
							handleDateChange={handleDateChange}
							handleOwnerChange={handleOwnerChange}
							setServerError={setServerError}
							handleAnimalTypeChange={handleAnimalTypeChange}
							disabledButton={disabledButton}
						/>
					</div>
				</div>
			</form>
		</div>
	);
}

export default AnimalRegister;
