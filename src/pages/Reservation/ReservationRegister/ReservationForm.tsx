import { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReservationApiCalls } from '../../../apiCalls/reservationApiCalls';
import { VetApiCalls } from '../../../apiCalls/vetApiCalls';
import Vet from '../../../classes/Vet';
import SubmitFormButton from '../../../components/Buttons/SubmitFormButton';
import FormDateReactDiv from '../../../components/Form/FormDateRectDiv';
import FormSelectLimit from '../../../components/Form/FormSelectLimit';
import BreadCrumbComponent from '../../../components/Navigation/BreadCrumbComponent';
import { getCurrentUser } from '../../../utils/authHelper';
import { getCurrentDate } from '../../../utils/getCurrentDate';
import { isManager, isOwner, isVet } from '../../../utils/userType';
import SelectOwnerComponent from '../../../components/Form/SelectOwnerComponent';
import ServerErrorInfoComponenet from '../../../components/InfoBanners/ServerErrorInfoBannerComponent';

import VetChoiceComponent from '../../../components/Form/VetChoiceComponent';
import CardTitleCompnenet from '../../../components/General/CardTitle';
import UpperPageStripe from '../../../components/General/UpperPageStripe';

export interface IReservationForm {
	ReservationDate: string | undefined;
	VetId: string | undefined;
	Hour: string | undefined;
	OwnerId: string;
}

function ReservationForm(): ReactElement {
	const navigate = useNavigate();
	const [date, setDate] = useState('');
	const [vetList, setVetList] = useState<Vet[]>([]);
	const [hours, setHours] = useState<string[]>([]);

	const [serverError, setServerError] = useState(false);

	const [reservation, setReservation] = useState<IReservationForm>({
		ReservationDate: '',
		VetId: '',
		Hour: '',
		OwnerId: isOwner() ? getCurrentUser().userTypeId : '',
	});

	const [error, setError] = useState<{
		ReservationDate: string;
		VetId: string;
		Hour: string;
		OwnerId: string;
	}>({
		ReservationDate: '',
		VetId: '',
		Hour: '',
		OwnerId: '',
	});

	const reservationApiCalls = new ReservationApiCalls();
	const vetApiCalls = new VetApiCalls();
	const onDateChange = async (e): Promise<void> => {
		//	e.preventDefault();
		console.log(e);
		//const { name, value } = e.target;
		setReservation((prev) => ({
			...prev,
			ReservationDate: e,
			VetId: '',
		}));

		setDate(e);
		setHours([]);
		setVetList([]);

		try {
			const response = await vetApiCalls.getVetsOnDay(e);
			if (response) {
				if (response.status == 200) {
					setError((prev) => ({
						...prev,
						ReservationDate: '',
					}));

					setVetList(await response.json());
				}
				if (response.status == 404) {
					setError((prev) => ({
						...prev,
						ReservationDate: 'W ten dzień nie przyjmujemy',
					}));
					setVetList([]);
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

	const onVetChange = async (e) => {
		e.preventDefault();
		const { name, value } = e.target;
		console.log(value);
		setReservation((prev) => ({
			...prev,
			VetId: value,
			Hour: '',
		}));
		setError((prev) => ({
			...prev,

			Hour: '',
		}));
		setHours([]);
		try {
			const response = await vetApiCalls.getValiableHours(date, value);
			if (response) {
				if (response.status == 200) {
					setHours(await response.json());
				}
				if (response.status == 500) {
					setServerError(true);
				}
				if (response.status == 404) {
					setError((prev) => ({
						...prev,
						Hour: 'Brak wolnych terminów',
					}));
				}
			}
		} catch (error) {
			console.log(error);
			setServerError(true);
		}
	};

	const onHourChange = async (e): Promise<void> => {
		const { name, value } = e.target;

		setReservation((prev) => ({
			...prev,
			Hour: value,
		}));
	};

	const onOwnerChange = async (e): Promise<void> => {
		//const { name, value } = e.target;
		const value = e.value;
		setReservation((prev) => ({
			...prev,
			OwnerId: value,
		}));
	};

	const validateForm = (): boolean => {
		let isValid: boolean = true;
		console.log(reservation);
		for (const [name, value] of Object.entries(reservation)) {
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

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (validateForm()) {
			setDisabledButton(true);
			try {
				const response = await reservationApiCalls.registerReservation(
					reservation
				);
				if (response) {
					setDisabledButton(false);
					if (response.status == 201) {
						navigate('/reservations', {
							state: { id: (await response.json()).newId },
						});
					}
					if (response.status == 500) {
						setServerError(true);
					}
				}
			} catch (error) {
				setServerError(true);
				setDisabledButton(false);
			}
		}
	};
	const setServerErrorChild = () => {
		setServerError(true);
	};
	const [disabledButton, setDisabledButton] = useState(false);
	return (
		<div>
			<UpperPageStripe
				bredCrumbs={
					<BreadCrumbComponent
						elements={[
							{ label: 'Rezerwacje', active: false, link: '/reservations' },
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
			<form className="container" onSubmit={handleSubmit}>
				<ServerErrorInfoComponenet serverError={serverError} />

				<div className="row justify-content-center">
					<div className="col-lg-4 ">
						<div className="card card-body shadow">
							<CardTitleCompnenet label="Nowa rezerwacja" />
							<div className="col-12">
								{isVet() || isManager() ? (
									<SelectOwnerComponent
										onChange={onOwnerChange}
										error={error.OwnerId}
										setServerError={setServerErrorChild}
										selectedValue={reservation.OwnerId}
										editForm={false}
										realised={false}
									/>
								) : null}
							</div>

							<div className="col-12">
								<FormDateReactDiv
									name="day"
									label="Data"
									error={error.ReservationDate}
									onChange={onDateChange}
									min={getCurrentDate()}
									value={reservation.ReservationDate}
									filter={undefined}
									disabled={undefined}
									selected={undefined}
								/>
							</div>

							<div className="col-12">
								<div className="col-12">
									{reservation.ReservationDate ? (
										<VetChoiceComponent
											selected={reservation.VetId}
											vetList={vetList}
											error={error.VetId}
											handleVetChange={onVetChange}
										/>
									) : null}
								</div>
							</div>

							{reservation.VetId ? (
								<div className="col-12 mt-3">
									<FormSelectLimit
										label="Godzina"
										name="hour"
										onChange={onHourChange}
										array={hours}
										id={'element'}
										elementLabel={'element'}
										error={error.Hour}
										arrayIsObjectList={false}
										selectedValue={''}
										selected={false}
									/>
								</div>
							) : null}
							{reservation.Hour && (
								<div className=" col-12 justify-content-center">
									<SubmitFormButton label={'Zapisz'} disable={disabledButton} />
								</div>
							)}
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}

export default ReservationForm;
