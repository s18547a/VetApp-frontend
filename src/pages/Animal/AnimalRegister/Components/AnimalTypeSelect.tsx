import { useEffect, useState } from 'react';
import { AnimalApiCalls } from '../../../../apiCalls/animalApiCalls';
import AnimalType from '../../../../classes/AnimalType';
import FormSelectReact from '../../../../components/Form/FromSelectReact';

function AnimalTypeSelect({
	setServerError,
	error,
	editForm,
	handleAnimalTypeChange,
	selectedValue,
}) {
	const [animalTypeList, setAnimaLTypeList] = useState<AnimalType[]>([]);

	const [dataOptions, setDataOptions] = useState<
		{ label: string; value: string }[]
	>([]);

	const createOptionList = (animalTypeList): void => {
		const optionList: { value: string; label: string }[] = [];

		animalTypeList.forEach((type) => {
			optionList.push({
				value: type.AnimalTypeId,
				label: `${type.Family} , ${type.Race}`,
			});
		});

		setDataOptions(optionList);
	};
	const animalApiCalls = new AnimalApiCalls();
	useEffect(() => {
		const loadVetTypes = async () => {
			try {
				const response = await animalApiCalls.getAnimalTypes();
				if (response) {
					const data = await response.json();
					if (response.status == 200) {
						setAnimaLTypeList(data);
						createOptionList(data);
					}
					if (response.status == 500) {
						setServerError(true);
					}
				}
			} catch (error) {
				console.log(error);
				setServerError(true);
			}
		};
		loadVetTypes();
	}, []);

	return (
		<FormSelectReact
			options={dataOptions}
			error={error}
			label={'Rodzaj'}
			name="AnimalTypeId"
			disabled={false}
			selectedValue={selectedValue}
			onChange={handleAnimalTypeChange}
			editForm={editForm}
		/>
	);
}

export default AnimalTypeSelect;
