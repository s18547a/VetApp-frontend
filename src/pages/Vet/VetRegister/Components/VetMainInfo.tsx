import { ReactElement } from 'react';
import SubmitFormButton from '../../../../components/Buttons/SubmitFormButton';

import FormDateReactDiv from '../../../../components/Form/FormDateRectDiv';
import FormDiv from '../../../../components/Form/FormDiv';
import CardTitleCompnenet from '../../../../components/General/CardTitle';
import { IVetError, IVetForm } from '../VetForm';

function VetMainInfo({
	disabledButton,
	error,
	handleChange,
	handleDateChange,
	vet,
	editForm,
}: {
	disabledButton: boolean;
	error: IVetError;
	handleChange: (any) => void;
	handleDateChange: (any) => void;
	vet: IVetForm;
	editForm: boolean;
}): ReactElement {
	return (
		<div className="card card-body shadow">
			<CardTitleCompnenet label="Nowy weterynarz" />
			<div className="row">
				<div className="col-12">
					<FormDiv
						name="Name"
						label="Imie"
						error={error.Name}
						onChange={handleChange}
						type="text"
						value={vet.Name}
						min={''}
						placeholder={''}
						disabled={undefined}
					/>
				</div>
				<div className="col-12">
					<FormDiv
						name="LastName"
						label="Nazwisko"
						error={error.LastName}
						onChange={handleChange}
						type="text"
						value={vet.LastName}
						min={''}
						placeholder={''}
						disabled={undefined}
					/>
				</div>
				<div className="col-12">
					<FormDiv
						name="Email"
						label="Email"
						error={error.Email}
						onChange={handleChange}
						type="text"
						value={vet.Email}
						min={''}
						placeholder={''}
						disabled={undefined}
					/>
				</div>
				<div className="col-12">
					<FormDiv
						name="Contact"
						label="Numer telefonu"
						error={error.Contact}
						onChange={handleChange}
						type="text"
						value={vet.Contact}
						min={''}
						placeholder={''}
						disabled={undefined}
					/>
				</div>
				{!editForm ? (
					<div className="col-12">
						<FormDiv
							name="Password"
							label="Hasło"
							error={error.Password}
							onChange={handleChange}
							type="text"
							value={undefined}
							min={''}
							placeholder={''}
							disabled={undefined}
						/>
					</div>
				) : null}

				<div className="col-12">
					<FormDateReactDiv
						name="HireDate"
						label="Data zatrudnienia"
						error={error.HireDate}
						onChange={handleDateChange}
						value={vet.HireDate}
						filter={undefined}
						disabled={undefined}
						selected={undefined}
						min={undefined}
					/>
				</div>

				<div className="col-12">
					<SubmitFormButton
						label={editForm === true ? 'Zapisz ' : 'Zarejestruj'}
						disable={disabledButton}
					/>
				</div>
			</div>
		</div>
	);
}

export default VetMainInfo;
