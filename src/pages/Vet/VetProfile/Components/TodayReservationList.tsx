import Reservation from '../../../../classes/Reservation';
import Surgery from '../../../../classes/Surgery';
import CardTitleCompnenet from '../../../../components/General/CardTitle';

function TodayReservationList({
	visitList,
	surgeryList,
	schedulde,
}: {
	visitList: Reservation[];
	surgeryList: Surgery[];
	schedulde: string[];
}) {
	const checkIfVetHaveActivityAtThisTIme = (hour: string): string => {
		const hourVisit = visitList.filter((visit) => {
			return visit.Hour == hour;
		})[0];
		if (hourVisit) {
			return 'Wizyta';
		}
		const surgeryVisit = surgeryList.filter((surgery) => {
			return surgery.StartTime == hour;
		})[0];
		if (surgeryVisit) {
			return 'Zabieg';
		} else return '';
	};
	return (
		<div className="row justify-content-center">
			<div className="col-10">
				<div className="card ">
					<div className="card-body shadow">
						<CardTitleCompnenet label="Dzisiejszy harmonogram" />

						<table className=" table table-bordered">
							<tbody>
								<tr>
									{schedulde.map((hour) => {
										return <th key={hour}>{hour}</th>;
									})}
								</tr>
								<tr>
									{schedulde.map((hour) => {
										return (
											<td style={{ height: '30px' }} key={hour}>
												{checkIfVetHaveActivityAtThisTIme(hour)}
											</td>
										);
									})}
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}

export default TodayReservationList;
