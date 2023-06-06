import { ReactElement, memo, useEffect, useState } from 'react';
import { OwnerApiCalls } from '../../apiCalls/ownerApiCalls';
import Owner from '../../classes/Owner';

import FormSelectReact from './FromSelectReact';

function SelectOwnerComponent({
	setServerError,
	onChange,
	error,
	selectedValue,
	editForm,
	realised,
}: {
	setServerError;
	onChange: (any) => void;
	error: string;
	selectedValue: any;
	editForm: boolean;
	realised: boolean;
}): ReactElement {
	const [ownerList, setOwnerList] = useState<
		{ value: string; label: string }[]
	>([]);

	const createOptionsForReactSelect = (ownerList: Owner[]) => {
		let optionList: { value: string; label: string }[] = [];
		if (ownerList) {
			ownerList.forEach((element) => {
				const option: { value: string; label: string } = {
					value: element.OwnerId as string,
					label: `${element.Email}`,
				};

				optionList.push(option);
			});

			setOwnerList(optionList);
		}
	};
	const ownerApiCalls = new OwnerApiCalls();
	const getOwnerListFromApi = async () => {
		try {
			const response = await ownerApiCalls.getOwners();
			if (response) {
				if (response.status == 200) {
					createOptionsForReactSelect(await response.json());
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

	useEffect(() => {
		getOwnerListFromApi();
	}, []);

	function onChangeFunction(e) {
		onChange(e);
	}

	return (
		<FormSelectReact
			name={'OwnerId'}
			onChange={onChangeFunction}
			disabled={realised}
			options={ownerList}
			label={'Właściciel'}
			error={error}
			selectedValue={selectedValue}
			editForm={editForm}
		/>
	);
}

export default memo(SelectOwnerComponent);
