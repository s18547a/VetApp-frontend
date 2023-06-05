import { ReactElement, useState } from 'react';
import SearchButton from '../../../../components/Buttons/SearchButton';
import FormSearchDateDiv from '../../../../components/Form/FormSearchDateDiv';
import FormSearchDiv from '../../../../components/Form/FormSearchDiv';
import { SearchListParamter } from '../../../../utils/VisitListParameters';

function VisitSearch({ onSearch }: { onSearch: (any) => void }): ReactElement {
	const [searchParameters, setSearchParamteters] = useState({
		Name: '',
		Email: '',
		Date: '',
	});

	const onChange = (e: any): void => {
		console.log(e);
		const { name, value } = e.target;

		setSearchParamteters((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const onSearchFuntion = (e): void => {
		e.preventDefault();
		const visitListParametersInstance = new SearchListParamter();
		visitListParametersInstance.setEmail(searchParameters.Email);
		visitListParametersInstance.setDate(searchParameters.Date);
		visitListParametersInstance.setName(searchParameters.Name);
		onSearch(visitListParametersInstance);
		setSearchParamteters(() => ({
			Name: '',
			Email: '',
			Date: '',
		}));
	};

	return (
		<form
			className="   d-flex  justify-content-center mt-2"
			onSubmit={onSearchFuntion}
		>
			<div className="me-3">
				<FormSearchDiv
					label={'Zwierzę'}
					name={'Name'}
					onChange={onChange}
					value={searchParameters.Name}
					type={''}
					min={''}
					disabled={false}
				/>
			</div>
			<div className="me-3">
				<FormSearchDiv
					label={'Weterynarz'}
					name={'Email'}
					onChange={onChange}
					value={searchParameters.Email}
					type={''}
					min={''}
					disabled={false}
				/>
			</div>
			<div className="me-3">
				<FormSearchDateDiv
					value={searchParameters.Date}
					name="Date"
					onChange={onChange}
					label={'Data'}
				/>
			</div>
			<div className="">
				<SearchButton />
			</div>
		</form>
	);
}

export default VisitSearch;
