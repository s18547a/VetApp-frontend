import { ReactElement, memo } from 'react';
import { Search } from 'react-bootstrap-icons';

function SearchButton(): ReactElement {
	return (
		<button
			type="submit"
			className="btn btn-outline-primary bg-primary text-white d-flex align-items-center btn-sm"
		>
			<a>Szukaj</a>
			<Search className="ms-2" />
		</button>
	);
}

export default memo(SearchButton);
