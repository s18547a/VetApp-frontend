import { useNavigate } from 'react-router-dom';

function VisitTable({ selectedPage, pagedList, newId }) {
	const navigate = useNavigate();
	return (
		<table className="table table-hover ">
			<thead>
				<tr>
					<th>Data</th>
					<th>Zwierzę</th>
					<th>Weterynarz</th>
				</tr>
			</thead>

			<tbody>
				{pagedList[selectedPage]?.map((visit) => {
					return (
						<tr
							key={visit.VisitId}
							onClick={() => {
								navigate('/visits/' + visit.VisitId);
							}}
							className={newId == visit.VisitId ? 'table-success' : ''}
						>
							<td>{visit.VisitDate}</td>
							<td>{visit.Animal.Name}</td>
							<td>{`${visit.Vet.Name} ${visit.Vet.LastName}`}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}
export default VisitTable;
