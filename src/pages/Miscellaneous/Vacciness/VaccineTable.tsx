import { XLg } from 'react-bootstrap-icons';
import ModalEnableCancelBtn from '../../../components/Modal/ModalEnableCancelBtn';

function VaccineTable({ vaccineList, setDeletedVaccine }) {
	return (
		<table className=" table table-bordered">
			<thead>
				<tr>
					<th>Szczepienie</th>
					<th>Rodzaj</th>
					<th>Wymagana</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{vaccineList.map((vaccine) => {
					return (
						<tr key={vaccine.VaccineType}>
							<td>{vaccine.VaccineType}</td>
							<td>{vaccine.Species}</td>
							<td>{vaccine.Core ? 'Tak' : 'Nie'}</td>
							<td>
								<div className="d-flex justify-content-center">
									<ModalEnableCancelBtn
										className={' '}
										id="vac"
										onClick={() => {
											setDeletedVaccine(vaccine.VaccineType);
										}}
										value={vaccine.VaccineType}
										icon={<XLg />}
									/>
								</div>
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}

export default VaccineTable;
