import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../../../utils/authHelper';
import { spaceContact } from '../../../../utils/contactHelper';

function VetTable({ vetList, VetId }) {
	const navigate = useNavigate();
	return (
		<table className="table table-hover">
			<thead>
				<tr>
					<th>Weterynarz</th>
					<th>Zatrudniony od</th>
					<th>Telefon</th>
					<th>Email</th>
				</tr>
			</thead>
			<tbody>
				{vetList.map((vet) => {
					{
						getCurrentUser().userId != vet.VetId;
					}
					return (
						<tr
							key={vet.VetId}
							onClick={() => {
								navigate('/vets/' + vet.VetId);
							}}
							className={VetId == vet.VetId ? 'table-success' : ''}
						>
							<td>{vet.Name + ' ' + vet.LastName}</td>
							<td>{vet.HireDate}</td>
							<td>{spaceContact(vet.Contact)}</td>
							<td>{vet.Email}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}
export default VetTable;
