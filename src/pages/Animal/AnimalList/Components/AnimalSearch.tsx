import { ReactElement, useState } from 'react';
import SearchButton from '../../../../components/Buttons/SearchButton';
import FormSearchDiv from '../../../../components/Form/FormSearchDiv';

function AnimalSearch(props): ReactElement {
	const [searchParameters, setSearchParamteters] = useState({
		Email: '',
	});

	const onChange = (e) => {
		console.log(e);
		const { name, value } = e.target;

		setSearchParamteters((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const onSearch = (e) => {
		e.preventDefault();

		props.onSearch(searchParameters.Email);
		setSearchParamteters(() => ({
			Email: '',
		}));
	};

	return (
		<form className="d-flex justify-content-center mt-2" onSubmit={onSearch}>
			<div className="">
				<FormSearchDiv
					label={'Email właściciela'}
					name={'Email'}
					onChange={onChange}
					value={searchParameters.Email}
					type={''}
					min={''}
					disabled={false}
				/>
			</div>

			<div className="ms-3 ">
				<SearchButton />
			</div>
		</form>
	);
}

export default AnimalSearch;
