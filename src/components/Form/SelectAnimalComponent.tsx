import { ReactElement, memo, useEffect, useState } from 'react';
import { AnimalApiCalls } from '../../apiCalls/animalApiCalls';
import Animal from '../../classes/Animal';

function SelectAnimalComponent({
	setServerError,
	OwnerId,
	onChange,
	error,
}: {
	setServerError;
	OwnerId: string;
	onChange: (any) => void;
	error: string;
}): ReactElement {
	const [animalList, setAnimalList] = useState<Animal[]>([]);

	const animalApiCalls = new AnimalApiCalls();
	const getAnimalListFromApi = async (OwnerId: string) => {
		if (OwnerId) {
			try {
				const response = await animalApiCalls.getAnimalsbyOwner(OwnerId);
				if (response) {
					if (response.status == 200) {
						setAnimalList(await response.json());
					}
					if (response.status === 404) {
						setAnimalList([]);
					}
					if (response.status === 500) {
						setAnimalList([]);
						setServerError(true);
					}
				}
			} catch (error) {
				setServerError(true);
				setAnimalList([]);
			}
		}
	};

	useEffect(() => {
		getAnimalListFromApi(OwnerId);
	}, [OwnerId]);

	function onChangeFunction(e) {
		onChange(e);
	}

	return (
		<>
			{OwnerId && (
				<div>
					<div className="form-group">
						<div className="row">
							<div className="col-lg-3 col-md-12">
								<label className=" form-label ">Zwierzę</label>
							</div>
							<div className="col-12">
								{animalList.map((animal) => {
									return (
										<div
											key={animal.AnimalId}
											className={
												error == ''
													? 'form-check  form-control d-flex justify-content-between'
													: 'form-check  form-control d-flex justify-content-between border border-danger'
											}
										>
											<label
												className="form-check-label"
												htmlFor={`${animal.AnimalId}`}
											>
												{animal.Name}
											</label>
											<input
												className="form-check-input"
												type="radio"
												name="AnimalId"
												id={`${animal.AnimalId}`}
												value={`${animal.AnimalId}`}
												onChange={onChangeFunction}
											/>
										</div>
									);
								})}
							</div>
						</div>
						<div className="col-12">
							<label className="form-text text-danger ">{error}</label>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default memo(SelectAnimalComponent);
