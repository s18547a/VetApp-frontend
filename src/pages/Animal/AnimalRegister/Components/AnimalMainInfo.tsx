import { ReactElement, useState } from 'react';

import SubmitFormButton from '../../../../components/Buttons/SubmitFormButton';
import FormBirthDate from '../../../../components/Form/FormBirthDate';
import FormCheck from '../../../../components/Form/FormCheck';
import FormDiv from '../../../../components/Form/FormDiv';

import SelectOwnerComponent from '../../../../components/Form/SelectOwnerComponent';
import CardTitleCompnenet from '../../../../components/General/CardTitle';
import { isOwner } from '../../../../utils/userType';
import { IAnimalForm } from '../AnimalForm';
import AnimalTypeSelect from './AnimalTypeSelect';

function AnimalMainInfo({
	handleChange,
	error,
	animal,
	disabledButton,
	editForm,
	handleDateChange,
	handleOwnerChange,
	setServerError,
	handleAnimalTypeChange,
}: {
	handleChange: (any) => void;
	error: {
		OwnerId: string;
		Name: string;
		BirthDate: string;
		AnimalTypeId: string;
		Sex: string;
	};
	animal: IAnimalForm;
	disabledButton: boolean;
	editForm: boolean;
	handleDateChange: (any) => void;
	handleOwnerChange: (any) => void;
	setServerError;
	handleAnimalTypeChange: (any) => void;
}): ReactElement {
	const handleChangeFuntion = (e: any): void => {
		handleChange(e);
	};
	const handleDateChangeFunction = (e): void => {
		handleDateChange(e);
	};

	const ownerField = (
		<SelectOwnerComponent
			setServerError={setServerError}
			onChange={handleOwnerChange}
			error={error.OwnerId}
			selectedValue={animal.OwnerId}
			editForm={editForm}
			realised={false}
		/>
	);

	return (
		<div className="card card-body shadow">
			<CardTitleCompnenet label="Informacje podstawowe" />
			<div className="row">
				<div className="col-12">
					<FormDiv
						label="Imie"
						name="Name"
						error={error.Name}
						type="text"
						onChange={handleChange}
						value={animal.Name}
						min={''}
						placeholder={''}
						disabled={undefined}
					/>
				</div>

				<div className="col-12">
					<FormBirthDate
						onChange={handleDateChangeFunction}
						error={error.BirthDate}
						value={animal.BirthDate}
					/>
				</div>

				<div className="col-12">
					<AnimalTypeSelect
						setServerError={setServerError}
						error={error.AnimalTypeId}
						editForm={editForm}
						handleAnimalTypeChange={handleAnimalTypeChange}
						selectedValue={animal.AnimalTypeId}
					/>
				</div>
				<div className="col-12">{isOwner() ? null : ownerField}</div>
				<div className="col-12">
					<FormCheck
						label="Płeć"
						name="Sex"
						error={error.Sex}
						onChange={handleChangeFuntion}
						selected={animal.Sex}
						elements={[
							{
								value: 1,
								id: 'male',
								label: 'Samiec',
							},
							{
								value: 2,
								id: 'female',
								label: 'Samica',
							},
							{
								value: 0,
								id: 'unknown',
								label: 'Nieokreślono',
							},
						]}
					/>
				</div>
				<div className="col-12 mt-3">
					<SubmitFormButton
						label={editForm === true ? 'Zapisz zmiany' : 'Zarejestruj'}
						disable={disabledButton}
					/>
				</div>
			</div>
		</div>
	);
}

export default AnimalMainInfo;
