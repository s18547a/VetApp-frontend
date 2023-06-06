import { ReactElement, useCallback, useEffect, useState } from 'react';

import SelectOwnerComponent from '../../../components/Form/SelectOwnerComponent';
import SelectAnimalComponent from '../../../components/Form/SelectAnimalComponent';
import VetChoiceComponent from '../../../components/Form/VetChoiceComponent';

import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { SurgeryApiCalls } from '../../../apiCalls/surgeryApiCalls';
import { VetApiCalls } from '../../../apiCalls/vetApiCalls';
import Animal from '../../../classes/Animal';
import SurgeryType from '../../../classes/SurgeryType';
import Vet from '../../../classes/Vet';
import SubmitFormButton from '../../../components/Buttons/SubmitFormButton';
import FormDateReactDiv from '../../../components/Form/FormDateRectDiv';
import FormSelectLimit from '../../../components/Form/FormSelectLimit';
import FormTextField from '../../../components/Form/FormTextField';
import ProfileDiv from '../../../components/Profile/ProfileDiv';

import BreadCrumbComponent from '../../../components/Navigation/BreadCrumbComponent';
import { getCurrentDate } from '../../../utils/getCurrentDate';
import ServerErrorInfoComponenet from '../../../components/InfoBanners/ServerErrorInfoBannerComponent';
import { checkIfAllFieldAsFilled } from '../../../utils/validatiorHelper';
import CardTitleCompnenet from '../../../components/General/CardTitle';
import UpperPageStripe from '../../../components/General/UpperPageStripe';

interface ISurgeryForm {
	OwnerId: string;
	SurgeryDate: string;
	SurgeryType: string;
	LeadVetId: string;

	AnimalId: string;

	Description: string | null;
	StartTime: string;
}
function SurgeryForm(): ReactElement {
	const [surgeryTypeList, setSurgeryTypeList] = useState<SurgeryType[]>([]);
	const vetApiCalls = new VetApiCalls();

	const [animalList, setAnimalList] = useState<Animal[]>([]);
	const [surgery, setSurgery] = useState<ISurgeryForm>({
		OwnerId: '',
		SurgeryDate: '',
		SurgeryType: '',
		LeadVetId: '',

		AnimalId: '',

		Description: '',
		StartTime: '',
	});
	const [error, setError] = useState<{
		OwnerId: string;
		SurgeryDate: string;
		SurgeryType: string;
		LeadVetId: string;
		AnimalId: string;

		Description: string;
		StartTime: string;
	}>({
		SurgeryDate: '',
		SurgeryType: '',
		LeadVetId: '',

		AnimalId: '',
		OwnerId: '',
		StartTime: '',
		Description: '',
	});
	const [vets, setVets] = useState<Vet[]>([]);
	const [availableHours, setAvailableHours] = useState<string[]>([]);
	const [serverError, setServerError] = useState(false);

	useEffect(() => {
		getSurgeryTypeList();
	}, []);

	const surgeryApiCalls = new SurgeryApiCalls();
	const getSurgeryTypeList = async () => {
		try {
			const response = await surgeryApiCalls.getSurgeryTypes();
			if (response) {
				if (response.status == 200) {
					setSurgeryTypeList(await response.json());
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
	const onChangeOwner = useCallback((e): void => {
		//e.preventDefault();
		const value = e.value;
		setAnimalList([]);
		setError((prev) => ({
			...prev,
			AnimalId: '',
		}));

		setSurgery((prev) => ({
			...prev,
			OwnerId: value,
		}));
	}, []);

	const onChange = useCallback((e): void => {
		const { name, value } = e.target;

		setSurgery((prev) => ({
			...prev,
			[name]: value,
		}));
	}, []);
	const [surgeryPriece, setSurgeryPriece] = useState(0);

	const onChangeType = async (e) => {
		const { name, value } = e.target;
		setVets([]);
		setAvailableHours([]);

		setSurgery((prev) => ({
			...prev,
			[name]: value,
			LeadVetId: '',
			SurgeryDate: '',
		}));
		const selectedTypePriece = surgeryTypeList.filter((x) => {
			return x.SurgeryType == value;
		})[0].Price;

		setSurgeryPriece(selectedTypePriece);
		setavailableDaysList([]);
		setavailableDaysListError('');
		try {
			const response = await vetApiCalls.getVetBySurgeryType(value);
			if (response) {
				if (response.status == 200) {
					setVets(await response.json());
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
	const [availableDayList, setavailableDaysList] = useState<String[]>([]);
	const [availableDayListError, setavailableDaysListError] = useState('');
	const onChangeVet = useCallback(async (e) => {
		const { name, value } = e.target;
		setError((prev) => ({
			...prev,
			StartTime: '',
		}));
		setAvailableHours([]);
		setSurgery((prev) => ({
			...prev,
			LeadVetId: value,
			SurgeryDate: '',
		}));
		try {
			const response = await vetApiCalls.getVetDaysOfWeek(value);
			if (response) {
				if (response.status == 200) {
					setavailableDaysList(await response.json());
				} else if (response.status == 404) {
					setavailableDaysListError('Weterynarz nie przyjmuje');
				} else {
					setServerError(true);
				}
			}
		} catch (error) {
			console.log(error);
			setServerError(true);
		}
	}, []);

	const navigate = useNavigate();
	const onHourChange = useCallback((e) => {
		setError((prev) => ({
			...prev,
			StartTime: '',
		}));
		const { name, value } = e.target;
		setSurgery((prev) => ({
			...prev,
			StartTime: value,
		}));
	}, []);
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (validateForm()) {
			setDisabledButton(true);
			try {
				const response = await surgeryApiCalls.registerSurgery(surgery);
				if (response) {
					setDisabledButton(false);
					if (response.status == 201) {
						navigate('/surgeries', {
							state: { newId: (await response.json()).newId },
						});
					} else {
						console.log(error);
						setServerError(true);
					}
				}
			} catch (error) {
				console.log(error);
				setServerError(true);
			}
		}
	};

	const validateForm = (): boolean => {
		let isValid = true;

		for (const [name, value] of Object.entries(surgery)) {
			error[name] = '';

			if (value === '' || value == undefined || value == null) {
				setError((prevErrors) => ({
					...prevErrors,
					[name]: 'Puste pole',
				}));

				isValid = false;
			}
		}
		return isValid;
	};

	const handleReactDatePicker = async (e) => {
		//	const date: String = e.toISOString().split('T')[0];

		setSurgery((prev) => ({
			...prev,
			SurgeryDate: e,
			StartTime: '',
		}));
		setAvailableHours([]);
		setError((prev) => ({
			...prev,
			StartTime: '',
		}));

		try {
			const respone = await vetApiCalls.getValiableHourForSurgery(
				e,
				surgery.LeadVetId
			);
			if (respone) {
				if (respone.status == 200) {
					setAvailableHours(await respone.json());
				} else if (respone.status == 404) {
					setError((prev) => ({
						...prev,
						StartTime: 'Brak dostępnych terminów',
					}));
				} else {
					setServerError(true);
				}
			}
		} catch (error) {
			console.log(error);
			setServerError(true);
		}
	};

	const filterDate = (e) => {
		const day = new Date(e).toLocaleDateString('en-EN', { weekday: 'long' });

		return availableDayList.includes(day);
	};

	const [disabledButton, setDisabledButton] = useState(false);

	return (
		<div>
			<UpperPageStripe
				bredCrumbs={
					<BreadCrumbComponent
						elements={[
							{ label: 'Zabiegi', active: false, link: '/surgeries' },
							{
								label: 'Rezerwacja',
								active: true,
								link: '',
							},
						]}
					/>
				}
			>
				{}
			</UpperPageStripe>
			<form className="container " onSubmit={handleSubmit}>
				<ServerErrorInfoComponenet serverError={serverError} />

				<div className="row justify-content-center">
					<div className=" col-lg-4 ">
						<div className="card card-body shadow">
							<CardTitleCompnenet label="Nowy zabieg" />
							<SelectOwnerComponent
								onChange={onChangeOwner}
								error={error.OwnerId}
								setServerError={setServerError}
								selectedValue={surgery.OwnerId}
								editForm={false}
								realised={false}
							/>

							<SelectAnimalComponent
								onChange={onChange}
								error={error.AnimalId}
								OwnerId={surgery.OwnerId}
								setServerError={setServerError}
							/>

							<FormSelectLimit
								label="Kategoria"
								name="SurgeryType"
								onChange={onChangeType}
								array={surgeryTypeList}
								id={'SurgeryType'}
								elementLabel="SurgeryType"
								error={error.SurgeryType}
								arrayIsObjectList={true}
								selected={false}
								selectedValue={''}
							/>

							<ProfileDiv label="Cena:" value={`${surgeryPriece} zł`} />

							<VetChoiceComponent
								selected={surgery.LeadVetId}
								handleVetChange={onChangeVet}
								vetList={vets}
								error={error.LeadVetId}
							/>

							{surgery.LeadVetId && (
								<FormDateReactDiv
									label="Termin"
									onChange={handleReactDatePicker}
									filter={filterDate}
									name="date"
									selected={
										surgery.SurgeryDate == ''
											? null
											: new Date(surgery.SurgeryDate)
									}
									error={error.SurgeryDate}
									disabled={surgery.LeadVetId == ''}
									min={new Date(getCurrentDate())}
									value={undefined}
								/>
							)}

							{surgery.SurgeryDate && (
								<FormSelectLimit
									label="Godzina"
									name="StartTime"
									onChange={onHourChange}
									array={availableHours}
									id={'element'}
									elementLabel={'element'}
									error={error.StartTime}
									arrayIsObjectList={false}
									selectedValue={''}
									selected={false}
								/>
							)}
							{surgery.StartTime && (
								<FormTextField
									label="Opis"
									name={'Description'}
									onChange={onChange}
									error={error.Description}
									value={undefined}
									placeholder={''}
									disabled={false}
								/>
							)}

							{checkIfAllFieldAsFilled(surgery) && (
								<div className="col-12">
									<SubmitFormButton
										label={'Zarezerwuj'}
										disable={disabledButton}
									/>
								</div>
							)}
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}

export default SurgeryForm;
