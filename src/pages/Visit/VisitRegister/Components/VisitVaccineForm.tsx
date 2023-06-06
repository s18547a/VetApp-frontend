import { memo, useEffect, useState } from 'react';
import { VaccineApiCalls } from '../../../../apiCalls/vaccineApiCalls';

import VaccineType from '../../../../classes/VaccineType';

function VisitVaccineForm({
	AnimalId,
	onChange,
	setServerError,
}: {
	AnimalId;
	onChange: (any) => void;
	setServerError;
}) {
	const [vaccineList, setVaccineList] = useState<VaccineType[]>([]);

	const vaccineApiCalls = new VaccineApiCalls();

	const getAnimalUnadminstratedVaccinesApiCall = async (AnimalId) => {
		if (AnimalId) {
			try {
				const response = await vaccineApiCalls.getAnimalUnadminstratedVaccines(
					AnimalId
				);

				if (response) {
					if (response.status == 200) {
						setVaccineList(await response.json());
					}
					if (response.status == 404) {
						setVaccineList([]);
					}
					if (response.status == 500) {
						setServerError(true);
					}
				}
			} catch (error) {
				console.log(error);
				setServerError(true);
			}
		}
	};
	useEffect(() => {
		getAnimalUnadminstratedVaccinesApiCall(AnimalId);
	}, [AnimalId]);

	return (
		<div className=" mt-3 card card-body shadow">
			<div className="card-title">
				<h5>Szczepienia</h5>
			</div>
			<div className="form-group">
				{vaccineList.map((vaccineType) => {
					return (
						<div
							className="form-check"
							id={vaccineType.VaccineType}
							key={vaccineType.VaccineType}
						>
							<input
								className="form-check-input"
								onChange={onChange}
								type="checkbox"
								value={`${vaccineType.VaccineType}`}
								id="flexCheckDefault"
							/>
							<label className="form-check-label" htmlFor="flexCheckDefault">
								{vaccineType.VaccineType}
							</label>{' '}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default memo(VisitVaccineForm);
