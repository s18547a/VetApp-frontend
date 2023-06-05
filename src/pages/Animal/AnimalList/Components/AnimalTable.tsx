import { useNavigate } from 'react-router-dom';

function AnimalTable({ selectedPage, pagedList, newId }) {
	const navigate = useNavigate();
	return (
		<table className="table table-hover ">
			<thead>
				<tr>
					<th>Imie</th>
					<th>Rasa</th>
					<th>Data urodzenia</th>
					<th>Właściciel</th>
				</tr>
			</thead>
			<tbody>
				{pagedList[selectedPage]?.map((animal) => {
					return (
						<tr
							key={animal.AnimalId}
							onClick={() => {
								navigate('/animals/' + animal.AnimalId);
							}}
							className={newId === animal.AnimalId ? 'table-success' : ''}
						>
							<td>{animal.Name}</td>
							<td>
								{`${animal.AnimalType?.Family}, 
                            
                            ${animal.AnimalType?.Race}`}
							</td>
							<td>{animal.BirthDate}</td>
							<td>{animal?.Owner.Email}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}
export default AnimalTable;
