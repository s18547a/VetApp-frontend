import { XLg } from 'react-bootstrap-icons';
import ModalEnableBtn from '../../../../components/Modal/ModalEnableBtn';
import { spaceContact } from '../../../../utils/contactHelper';
import {
	getCurrentDate,
	getCurrentHour,
} from '../../../../utils/getCurrentDate';
import { isOwner, isManager, isVet } from '../../../../utils/userType';

function ReservationTable({
	reservationList,
	message,
	handleRowCancel,
	handleReliseReservation,
}) {
	return (
		<table className="table table-hover">
			<thead>
				<tr>
					<th>{isOwner() ? 'Weterynarz' : 'Właściciel'}</th>
					<th>Data</th>
					<th>Godzina</th>
					<th>Kontakt</th>
					<th>Akcje</th>
				</tr>
			</thead>

			<tbody>
				{reservationList.map((reservation) => {
					return (
						<tr
							key={reservation.ReservationId}
							className={
								message.id == reservation.ReservationId
									? 'table-success'
									: getCurrentDate() >
											(!reservation.ReservationDate
												? ''
												: reservation.ReservationDate) ||
									  (getCurrentDate() == reservation.Date &&
											getCurrentHour() >
												(!reservation.Hour ? '' : reservation.Hour))
									? 'table-danger'
									: undefined
							}
						>
							<td>
								{isOwner()
									? `${reservation.Vet?.Name + ' ' + reservation.Vet?.LastName}`
									: `${
											reservation.Owner?.Name +
											' ' +
											reservation.Owner?.LastName
									  }`}
							</td>
							<td>{reservation.ReservationDate}</td>
							<td>{reservation.Hour}</td>
							<td>
								{isOwner()
									? spaceContact(reservation.Vet?.Contact)
									: spaceContact(reservation.Owner?.Contact)}
							</td>

							<td>
								<div className="row">
									<div className="col-auto">
										<ModalEnableBtn
											id={'cancelReservation'}
											className="btn btn-sm btn-danger"
											onClick={handleRowCancel}
											value={reservation.ReservationId}
											label="Anuluj"
											icon={<XLg />}
										/>
									</div>
									<div className="col-auto">
										{isManager() || isVet() ? (
											<button
												className="btn btn-sm btn-primary"
												value={`${reservation.ReservationId},${reservation.ReservationDate},${reservation.Hour},${reservation.OwnerId}`}
												onClick={handleReliseReservation}
											>
												Zrealizuj
											</button>
										) : null}
									</div>
								</div>
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}

export default ReservationTable;
