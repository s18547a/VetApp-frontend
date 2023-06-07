import { ReactElement, useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { ReservationApiCalls } from '../../../apiCalls/reservationApiCalls';
import Reservation from '../../../classes/Reservation';
import RegiserSuccessInfo from '../../../components/InfoBanners/RegisterSuccessBannerComponent';
import TableOrEmpty from '../../../components/List/TableOrEmpty';
import Modal from '../../../components/Modal/Modal';

import BreadCrumbComponent from '../../../components/Navigation/BreadCrumbComponent';
import { getCurrentUser } from '../../../utils/authHelper';

import { isVet, isManager, isOwner } from '../../../utils/userType';
import ServerErrorInfoComponenet from '../../../components/InfoBanners/ServerErrorInfoBannerComponent';
import { changePageTitle } from '../../../utils/otherHelper';
import CardTitleCompnenet from '../../../components/General/CardTitle';
import UpperPageStripe from '../../../components/General/UpperPageStripe';

import ReservationTable from './Components/ReservationTable';

function ReservationList(): ReactElement {
	const navigate = useNavigate();

	const [reservationList, setReservationList] = useState<Reservation[]>([]);

	const [reservationId, setReservationId] = useState<string | undefined>(
		undefined
	);

	const [empty, setEmpty] = useState<boolean>(false);

	const [message, setMessage] = useState({
		id: '',
		message: '',
	});
	const reservationApiCalls = new ReservationApiCalls();
	const [serverError, setServerError] = useState(false);
	const loadReservationList = async () => {
		changePageTitle('Rezerwacje');
		const currentUserId = getCurrentUser().userTypeId;

		let response;
		try {
			if (isVet() && !isManager()) {
				response = await reservationApiCalls.getReservationsByVetId(
					currentUserId
				);
			}
			if (isOwner()) {
				response = await reservationApiCalls.getReservationsByOwner(
					currentUserId
				);
			}
			if (isManager()) {
				response = await reservationApiCalls.getReservations();
			}

			if (response) {
				if (response.status == 200) {
					setReservationList(await response.json());
					setEmpty(false);
				}
				if (response.status == 404) {
					setEmpty(true);
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
		loadReservationList();

		const state = location.state as { id: string };
		if (state != null) {
			setMessage((prev) => ({
				...prev,
				id: state.id,
				message: 'Nowa rezerwacja: ',
			}));
		}
	}, []);

	const handleRowCancel = (event): void => {
		const { value } = event.target;
		console.log(value);
		setReservationId(event.target.value);
	};

	const handleClick = async (): Promise<void> => {
		try {
			const response = await reservationApiCalls.cancelReservation(
				reservationId
			);

			if (response.status == 201) {
				const data = await response.json();
				setMessage((prev) => ({
					id: data.deletedId,
					message: 'Anulowano rezerwacje: ',
				}));
				loadReservationList();
			}
		} catch (error) {
			setServerError(true);
			console.log(error);
		}
	};

	const location = useLocation();
	const handleReliseReservation = (event): void => {
		const { value } = event.target;
		const realiseReservationParameters: string[] = value.split(',');

		navigate('/visits/register', {
			state: {
				ReservationId: realiseReservationParameters[0],
				ReservationDate: realiseReservationParameters[1],
				Hour: realiseReservationParameters[2],
				OwnerId: realiseReservationParameters[3],
			},
		});
	};

	return (
		<div>
			<UpperPageStripe
				bredCrumbs={
					<BreadCrumbComponent
						elements={[{ label: 'Rezerwacje', active: true, link: '' }]}
					/>
				}
			>
				{}
			</UpperPageStripe>
			<div className="container">
				<Modal
					id={'cancelReservation'}
					function={handleClick}
					label={'Czy na pewno?'}
				/>
				<ServerErrorInfoComponenet serverError={serverError} />

				<RegiserSuccessInfo newId={message.id} message={message.message} />

				<div className=" card card-body shadow">
					<CardTitleCompnenet label="Rarejestrowane rezerwacje" />
					<TableOrEmpty Empty={empty}>
						<ReservationTable
							reservationList={reservationList}
							message={message}
							handleRowCancel={handleRowCancel}
							handleReliseReservation={handleReliseReservation}
						/>
					</TableOrEmpty>
				</div>
			</div>
		</div>
	);
}

export default ReservationList;
