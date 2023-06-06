import { ReactElement, useCallback, useEffect, useState } from 'react';
import { VetApiCalls } from '../../../apiCalls/vetApiCalls';
import { useLocation, useNavigate } from 'react-router-dom';
import PhotoForm from '../../../components/Form/PhotoForm';
import VetMainInfo from './Components/VetMainInfo';

import VetSpecForm from './Components/VetSpecForm';
import BreadCrumbComponent from '../../../components/Navigation/BreadCrumbComponent';
import ServerErrorInfoComponenet from '../../../components/InfoBanners/ServerErrorInfoBannerComponent';
import UpperPageStripe from '../../../components/General/UpperPageStripe';

export interface IVetForm {
	Name: string;
	LastName: string;
	Contact: string;
	Email: string;
	Password: string;
	HireDate: string;
	ProfileImage: string | null;
	VetType: string[];
}

export interface IVetError {
	Name: string;
	LastName: string;
	Contact: string;
	Email: string;
	Password: string;
	HireDate: string;
}
export interface VetTypeI {
	VetType: string;
}
function VetForm(): ReactElement {
	const vetApiCalls = new VetApiCalls();
	const navigate = useNavigate();

	const [vetTypeList, setVetTypeList] = useState<VetTypeI[]>([]);

	const [vet, setVet] = useState<IVetForm>({
		Name: '',
		LastName: '',
		Contact: '',
		Email: '',
		Password: '',
		HireDate: '',
		ProfileImage: null,
		VetType: [],
	});

	const [error, setError] = useState({
		Name: '',
		LastName: '',
		Contact: '',
		Email: '',
		Password: '',
		HireDate: '',
	});
	const location = useLocation();
	const [editForm, setEditForm] = useState(false);
	const [editVetId, setVetId] = useState('');
	const [serverError, setServerError] = useState(false);
	useEffect(() => {
		const loadVetTypes = async () => {
			try {
				const response = await vetApiCalls.getVetTypes();
				if (response) {
					if (response.status == 200) {
						setVetTypeList(await response.json());
					}
					if (response.status == 500) {
						setServerError(true);
					}
				}
			} catch (error) {
				console.log(error);
				setServerError(true);
			}
		};
		loadVetTypes();

		const state = location.state as { VetId: string };
		if (state != null) {
			setEditForm(true);
			setVetId(state.VetId);
			const loadVetEdit = async () => {
				const response = await vetApiCalls.getVetByVetId(state.VetId);
				if (response) {
					if (response.status == 200) {
						const data = await response.json();
						const types = data.Types;
						let formTypes: string[] = [];
						types.forEach((element) => {
							formTypes.push(element.VetType);
						});
						setVet((prev) => ({
							...prev,
							VetId: data.VetId,
							Name: data.Name,
							LastName: data.LastName,
							Contact: data.Contact,
							OldEmail: data.Email,
							Email: data.Email,
							Password: 'Pass',
							HireDate: data.HireDate,
							ProfileImage: data.ProfileImage,
							VetType: formTypes,
						}));
					} else {
						setServerError(true);
					}
				}
			};
			loadVetEdit();
		}
	}, []);

	const onChange = useCallback((e): void => {
		const { name, value } = e.target;
		setVet((prev) => ({
			...prev,
			[name]: value,
		}));
	}, []);
	const onVetTypeChange = (e): void => {
		const { name, value } = e.target;
		if (vet.VetType.includes(value)) {
			const newVetTypes = vet.VetType.filter((type) => {
				if (type != value) {
					return true;
				}
			});

			setVet((prev) => ({
				...prev,
				VetType: newVetTypes,
			}));
		} else if (!vet.VetType.includes(value)) {
			const newVetTypes = vet.VetType;
			newVetTypes.push(value);
			setVet((prev) => ({
				...prev,
				VetType: newVetTypes,
			}));
		}
	};

	const onDateChange = useCallback((e): void => {
		setVet((prev) => ({
			...prev,
			HireDate: e,
		}));
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(vet);

		if (validateForm()) {
			setDisabledButton(true);
			try {
				let response;
				if (editForm) {
					response = await vetApiCalls.updateVet(vet);
				} else {
					response = await vetApiCalls.registerVet(vet);
				}

				if (response) {
					setDisabledButton(false);
					if (response.status == 201) {
						if (editForm) {
							navigate(`/vets/${editVetId}`, { state: { updated: true } });
						} else {
							navigate('/vets', {
								state: { newId: (await response.json()).newId },
							});
						}
					}
					if (response.status == 409) {
						setError((prev) => ({
							...prev,
							Email: 'Email jest już zarejestrowany',
						}));
					}
					if (response.status == 500) {
						setServerError(true);
					}
				}
			} catch (error) {
				setServerError(true);
				console.log(error);
			}
		}
	};

	const validateForm = (): boolean => {
		let isValid = true;

		for (const [name, value] of Object.entries(vet)) {
			error[name] = '';

			if (name === 'Email') {
				if (!value.includes('@') && value !== '') {
					setError((prevErrors) => ({
						...prevErrors,
						[name]: 'Niepoprawny format Email',
					}));
					isValid = false;
				}
			}
			if (value === '') {
				setError((prevErrors) => ({
					...prevErrors,
					[name]: 'Puste pole',
				}));
				isValid = false;
			}
		}
		return isValid;
	};

	const setPhoto = (preview) => {
		setVet((prev) => ({
			...prev,
			ProfileImage: preview,
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
								{ label: 'Wetrynarze', active: false, link: '/vets' },
								{ label: 'Profil', active: false, link: `vets/${editVetId}` },
								{ label: 'Edycja', active: true, link: '' },
							]}
						/>
					) : (
						<BreadCrumbComponent
							elements={[
								{ label: 'Weterynarze', active: false, link: '/vets' },

								{ label: 'Rejestracja', active: true, link: '' },
							]}
						/>
					)
				}
			>
				{}
			</UpperPageStripe>
			<form className="container" onSubmit={handleSubmit}>
				<ServerErrorInfoComponenet serverError={serverError} />

				<div className="row">
					<div className="col-4">
						<PhotoForm
							setPhoto={setPhoto}
							preview={vet.ProfileImage}
							editForm={editForm}
						/>
					</div>

					<div className="col-4">
						<VetMainInfo
							disabledButton={disabledButton}
							handleChange={onChange}
							handleDateChange={onDateChange}
							error={error}
							vet={vet}
							editForm={editForm}
						/>
					</div>

					<div className="col-4">
						<VetSpecForm
							handleChange={onVetTypeChange}
							vetTypeList={vetTypeList}
							vetTypes={vet.VetType}
						/>
					</div>
				</div>
			</form>
		</div>
	);
}

export default VetForm;
