import { CheckLg } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

function SurgeryTable({ pagedList, selectedPage, setMessage, message }) {
	const navigate = useNavigate();

	return (
		<table className="table table-hover">
			<thead>
				<tr>
					<th>Weterynarz</th>
					<th>Data</th>
					<th>Godzina</th>

					<th>Zwierzę</th>
					<th>Raport</th>
				</tr>
			</thead>

			<tbody>
				{pagedList[selectedPage]?.map((surgery) => {
					return (
						<tr
							key={surgery.SurgeryId}
							onClick={() => {
								setMessage(() => ({
									message: '',
									id: '',
								}));
								navigate(`/surgeries/${surgery.SurgeryId}`);
							}}
							className={
								surgery.Report
									? ''
									: surgery.SurgeryId === message.id
									? 'table-success'
									: ' table-danger'
							}
						>
							<td>{`${surgery.Vet.Name} ${surgery.Vet.LastName}`}</td>
							<td>{surgery.SurgeryDate}</td>
							<td>{surgery.StartTime}</td>

							<td>{surgery.Animal.Name}</td>
							<td>{surgery.Report ? <CheckLg /> : null}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}

export default SurgeryTable;
