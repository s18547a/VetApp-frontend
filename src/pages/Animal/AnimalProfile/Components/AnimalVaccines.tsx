import { ReactElement } from 'react';
import Vaccination from '../../../../classes/Vaccination';
import VaccineType from '../../../../classes/VaccineType';
import CardTitleCompnenet from '../../../../components/General/CardTitle';
import TableOrEmpty from '../../../../components/List/TableOrEmpty';

function AnimalVaccines({
	vaccineList,
	coreList,
}: {
	vaccineList: Vaccination[];
	coreList: VaccineType[];
}): ReactElement {
	return (
		<div className="row justify-content-center">
			<div className="col-6 ">
				<div className="card card-body border-0 mt-8 shadow">
					<CardTitleCompnenet label="Odbyte szczepienia" />
					<TableOrEmpty Empty={vaccineList.length == 0}>
						<table className="table table-bordered">
							<thead>
								<tr>
									<th>Szczepionka</th>
									<th>Data</th>
								</tr>
							</thead>
							<tbody>
								{vaccineList.map((vaccination) => {
									return (
										<tr key={vaccination.VaccineType}>
											<td>{vaccination.VaccineType}</td>
											<td>{vaccination.VaccinationDate}</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</TableOrEmpty>
				</div>
			</div>
			{coreList.length != 0 && (
				<div className="col-4">
					<div className="card card-body border-0 mt-8 shadow">
						<div className="card-title">
							<h5 className=" text-danger">Wymagane szczepienia</h5>
						</div>
						{coreList.length != 0 ? (
							<ul className=" list-group">
								{coreList.map((vaccine) => {
									return (
										<li className=" list-group-item">{vaccine.VaccineType}</li>
									);
								})}
							</ul>
						) : (
							<div className="alert-success fw-bold">
								<div>Wykonano wszystkie obowiązkowe</div>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
}

export default AnimalVaccines;
