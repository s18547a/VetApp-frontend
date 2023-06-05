import { ReactElement } from 'react';
import { PencilSquare } from 'react-bootstrap-icons';

function EditButton({ onClick }): ReactElement {
	return (
		<button
			className="btn  btn-sm  d-flex align-items-center"
			onClick={onClick}
			data-bs-toogle=" tooltip"
			data-bs-placement="top"
			title="Edytuj"
		>
			<PencilSquare className="" />
		</button>
	);
}

export default EditButton;
