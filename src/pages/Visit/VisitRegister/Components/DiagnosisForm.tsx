import { useEffect, useState } from 'react';

interface DiagnosisI {
	Number: number;
	Description: String;
}

function DiagnosisForm({
	AnimalId,
	setDiagnosisList,
}: {
	AnimalId: string;
	setDiagnosisList: (any) => void;
}) {
	const [diagnosisList, setComponentDiagnosisList] = useState<DiagnosisI[]>([]);
	const [numberOfDiagnosis, setNumberOfDiagnosis] = useState(0);

	useEffect(() => {
		setComponentDiagnosisList([]);
		setNumberOfDiagnosis(0);
	}, [AnimalId]);

	const addDiagnosis = (e) => {
		const newDiagnosos = { Number: numberOfDiagnosis, Description: '' };

		const newDignosisArray = diagnosisList.slice();
		newDignosisArray.push(newDiagnosos);
		const newDiagnosisNumber = numberOfDiagnosis + 1;
		setNumberOfDiagnosis(newDiagnosisNumber);
		setComponentDiagnosisList(newDignosisArray);
	};

	const handleDiagnosisChange = (e) => {
		const { name, value } = e.target;

		for (let i = 0; i < diagnosisList.length; i++) {
			if (diagnosisList[i].Number == name) {
				diagnosisList[i].Description = value;
			}
		}
		console.log(diagnosisList);
		setDiagnosisListPrent();
	};

	const removeDiagnosis = (e) => {
		e.preventDefault();
		const { name, value } = e.target;
		const numberName = Number(value);
		console.log(numberName);

		const oldDiagnosisList = diagnosisList;
		const newDiagnosisList = oldDiagnosisList.filter((value) => {
			if (value.Number != numberName) {
				return value;
			}
		});
		setComponentDiagnosisList(newDiagnosisList);
	};

	const setDiagnosisListPrent = () => {
		setDiagnosisList(diagnosisList);
	};

	const diagnosisFromComponenet = (
		<div className="card card-body shadow">
			<div className="card-title d-flex justify-content-between">
				<h5>Diagnozy</h5>
				<a
					className="btn btn-primary btn-sm"
					role={'button'}
					onClick={addDiagnosis}
				>
					Dodaj
				</a>
			</div>

			<div className="row">
				{diagnosisList.map((d) => {
					return (
						<div className="col-12 mt-1 mb-1 m-0 p-0" key={d.Number}>
							<div className="">
								<div className=" ">
									<button
										className="btn btn-close border-top border-start border-end"
										value={d.Number}
										onClick={removeDiagnosis}
									></button>
								</div>

								<textarea
									name={String(d.Number)}
									className="form-control"
									onChange={handleDiagnosisChange}
									rows={2}
								/>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);

	return diagnosisFromComponenet;
}

export default DiagnosisForm;
