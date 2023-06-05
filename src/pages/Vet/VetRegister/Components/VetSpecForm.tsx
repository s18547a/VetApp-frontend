import { ReactElement } from 'react';
import CardTitleCompnenet from '../../../../components/General/CardTitle';
import { VetTypeI } from '../VetForm';

function VetSpecForm({
	handleChange,
	vetTypeList,
	vetTypes,
}: {
	handleChange: (any) => void;
	vetTypeList: VetTypeI[];
	vetTypes: string[];
}): ReactElement {
	return (
		<div className="card card-body shadow">
			<CardTitleCompnenet label="Specjalizacje" />
			<div className="row">
				<div className="col-12">
					<div className="">
						{vetTypeList.map((type) => {
							return (
								<div className="form-check">
									<input
										className="form-check-input"
										onChange={handleChange}
										type="checkbox"
										value={type.VetType}
										id="flexCheckDefault"
										checked={vetTypes.includes(type.VetType)}
									/>
									<label
										className="form-check-label"
										htmlFor="flexCheckDefault"
									>
										{type.VetType}
									</label>{' '}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}

export default VetSpecForm;
