import { ReactElement, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { VisitApiCalls } from '../../../apiCalls/visitApiCalls';
import MedicalActivity from '../../../classes/MedicalActivity';
import VaccineType from '../../../classes/VaccineType';
import BreadCrumbComponent from '../../../components/Navigation/BreadCrumbComponent';
import { getCurrentUser } from '../../../utils/authHelper';
import ServerErrorInfoComponenet from '../../../components/InfoBanners/ServerErrorInfoBannerComponent';
import DiagnosisForm from './Components/DiagnosisForm';
import VisitActivitiesForm from './Components/VisitActivitesForm';
import VisitMainInfoForm from './Components/VisitMainInfoForm';
import VisitVaccineForm from './Components/VisitVaccineForm';
import UpperPageStripe from '../../../components/General/UpperPageStripe';
import { VaccineApiCalls } from '../../../apiCalls/vaccineApiCalls';

export interface IVisitForm {
	VisitDate: string;
	VetId: string;
	OwnerId: string;
	AnimalId: string;
	Hour: string;
	Note: string | null;
	Bill: number;
	MedicalActivities: string[];
	DiagnosisList: [];
	VaccineList: string[];
	ReservationId: string;
}
export interface IVisitError {
	VisitDate: string;
	VetId: string;
	OwnerId: string;
	AnimalId: string;
	Hour: string;
	Note: string | null;
}
function VisitForm(): ReactElement {
	const vaccineApiCalls = new VaccineApiCalls();
	const [serverError, setServerError] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();
	const [visit, setVisit] = useState<IVisitForm>({
		VisitDate: '',
		VetId: getCurrentUser().userId,
		OwnerId: '',
		AnimalId: '',
		Hour: '',
		Note: null,
		Bill: 0,
		MedicalActivities: [],
		DiagnosisList: [],
		VaccineList: [],
		ReservationId: '',
	});

	const [medicalActivities, setMedicalActivities] = useState<MedicalActivity[]>(
		[]
	);

	const [error, setError] = useState<IVisitError>({
		VisitDate: '',
		VetId: '',
		AnimalId: '',
		Hour: '',
		Note: '',
		OwnerId: '',
	});

	const visitApiCalls = new VisitApiCalls();
	useEffect(() => {
		const loadMedicalActivites = async () => {
			try {
				const response = await visitApiCalls.getMedicalAtivities();
				if (response) {
					if (response.status == 200) {
						setMedicalActivities(await response.json());
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
		loadMedicalActivites();

		const state = location.state as {
			ReservationId: string;
			ReservationDate: string;
			Hour: string;
			OwnerId: string;
		};
		if (state) {
			setReservedId(state.ReservationId);
			setRealised(true);
			setVisit((prev) => ({
				...prev,
				VisitDate: state.ReservationDate,
				Hour: state.Hour,
				OwnerId: state.OwnerId,
			}));
		}
	}, []);
	const [realised, setRealised] = useState<boolean>(false);
	const [reservedId, setReservedId] = useState('');

	const onChange = (e): void => {
		const { name, value } = e.target;
		if (name == 'AnimalId' || name == 'OwnerId') {
			setVisit((prev) => ({
				...prev,
				MedicalActivities: [],
				Bill: 0,
				VaccineList: [],
				DiagnosisList: [],
			}));
		}
		setVisit((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const onChangeOwner = (e): void => {
		setError((prev) => ({
			...prev,
			AnimalId: '',
		}));

		const value = e.value;
		setVisit((prev) => ({
			...prev,
			OwnerId: value,
			AnimalId: '',
		}));
	};

	const handleDateChange = (e): void => {
		setVisit((prev) => ({
			...prev,
			VisitDate: e,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (validateForm()) {
			setDisabledButton(true);
			try {
				const newVisit = visit;
				newVisit.ReservationId = reservedId;

				const response = await visitApiCalls.registerVisit(newVisit);
				if (response) {
					setDisabledButton(false);

					if (response.status == 201) {
						navigate('/visits', {
							state: { id: (await response.json()).newId },
						});
					}
					if (response.status == 500) {
						setServerError(true);
					}
				}
			} catch (error) {
				console.log(error);
				setDisabledButton(false);
				setServerError(true);
			}
		}
	};

	const validateForm = (): boolean => {
		let isValid = true;

		for (const [name, value] of Object.entries(visit)) {
			error[name] = '';

			if (name != 'ReservationId') {
				if (name != 'Note' && (value === '' || value == null)) {
					setError((prevErrors) => ({
						...prevErrors,
						[name]: 'Puste pole',
					}));
					isValid = false;
				}
				if (name == 'Hour' && value != '' && value != null) {
					const regex = '[0-2][0-9]:[0-5][0-9]';
					const match = value.match(regex);
					if (match == null) {
						setError((prevErrors) => ({
							...prevErrors,
							[name]: 'Niepoprawny format',
						}));
						isValid = false;
					} else {
						const hourArray = value.split(':');

						if (hourArray[1] > 59 || hourArray[0] > 23) {
							setError((prevErrors) => ({
								...prevErrors,
								[name]: 'Niepoprawny format',
							}));
							isValid = false;
						}
					}
				}
			}
		}
		return isValid;
	};

	const setDiagnosisList = (value): void => {
		setVisit((prev) => ({
			...prev,
			DiagnosisList: value,
		}));
	};

	const changeActivity = (e): void => {
		const { name, value } = e.target;

		if (!visit.MedicalActivities.includes(value)) {
			for (const [nameMedAct, medAct] of Object.entries(medicalActivities)) {
				if (medAct.MedicalActivityId == value) {
					const newMedicalActivites = visit.MedicalActivities.map((x) => x);
					newMedicalActivites.push(value);
					setVisit((prev) => ({
						...prev,
						MedicalActivities: newMedicalActivites,
					}));
				}
			}
		} else {
			for (const [nameMedAct, medAct] of Object.entries(medicalActivities)) {
				if (medAct.MedicalActivityId == value) {
					let newMedicalActivites = visit.MedicalActivities.map((x) => x);
					newMedicalActivites = newMedicalActivites.filter((arrval) => {
						if (arrval != value) {
							return true;
						}
					});
					setVisit((prev) => ({
						...prev,
						MedicalActivities: newMedicalActivites,
					}));
				}
			}
		}
	};

	const changeVaccine = (e) => {
		const { name, value } = e.target;

		let vacList = visit.VaccineList;
		if (!vacList.includes(value)) {
			vacList.push(value);
		} else {
			vacList = vacList.filter((vac) => {
				return !(value != vac);
			});
		}

		setVisit((prev) => ({
			...prev,
			VaccineList: vacList,
		}));
	};

	const [vaccineList, setVaccineList] = useState<VaccineType[]>([]);

	const calculateBill = (): void => {
		const preformedActivites = visit.MedicalActivities;
		let bill: number = 0;
		preformedActivites.forEach((activity) => {
			const price = medicalActivities.filter((act) => {
				if (act.MedicalActivityId === activity) {
					return true;
				}
			})[0].Price;
			bill = bill + price;
		});

		setVisit((prev) => ({
			...prev,
			Bill: bill,
		}));
	};
	useEffect(() => {
		calculateBill();
	}, [visit.MedicalActivities]);

	const getAnimalUnadminstratedVaccinesApiCall = async (AnimalId: string) => {
		try {
			if (visit.AnimalId) {
				const response = await vaccineApiCalls.getAnimalUnadminstratedVaccines(
					AnimalId
				);

				if (response.status == 200) {
					setVaccineList(await response.json());
				}
				if (response.status == 404) {
					setVaccineList([]);
				}
				if (response.status == 500) {
					setServerError(true);
				}
			}
		} catch (error) {
			setServerError(true);
			console.log(error);
		}
	};
	useEffect(() => {
		getAnimalUnadminstratedVaccinesApiCall(visit.AnimalId);
	}, [visit.AnimalId]);

	const [disabledButton, setDisabledButton] = useState(false);

	return (
		<div className="">
			<UpperPageStripe
				bredCrumbs={
					<BreadCrumbComponent
						elements={[
							{ label: 'Wizyty', active: false, link: '/visits' },
							{
								label: 'Rejestracja',
								active: true,
								link: '',
							},
						]}
					/>
				}
			>
				{}
			</UpperPageStripe>
			<form className=" container " onSubmit={handleSubmit}>
				<ServerErrorInfoComponenet serverError={serverError} />

				<div className="row justify-content-center">
					<div className="col-lg-4 ">
						<VisitActivitiesForm
							changeActivity={changeActivity}
							medicalActivities={medicalActivities}
							AnimalId={visit.AnimalId}
						/>

						<VisitVaccineForm
							AnimalId={visit.AnimalId}
							onChange={changeVaccine}
							setServerError={setServerError}
						/>
					</div>
					<div className="col-lg-4">
						<VisitMainInfoForm
							onChange={onChange}
							onChangeOwner={onChangeOwner}
							onChangeDate={handleDateChange}
							error={error}
							visit={visit}
							editForm={realised}
							setServerError={setServerError}
							realised={realised}
							disabledButton={disabledButton}
						/>
					</div>
					<div className="col-lg-4">
						<DiagnosisForm
							setDiagnosisList={setDiagnosisList}
							AnimalId={visit.AnimalId}
						/>
					</div>
				</div>
			</form>
		</div>
	);
}

export default VisitForm;
