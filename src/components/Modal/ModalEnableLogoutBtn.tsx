import { ReactElement } from 'react';
import { BoxArrowLeft, DoorClosed } from 'react-bootstrap-icons';

function ModalEnableLogoutBtn({
	className,
	id,
	value,
}: {
	className: string;
	id: string;

	value: string;
}): ReactElement {
	return (
		<button
			className={`${className}  d-flex justify-content-center align-items-center`}
			type="button"
			data-bs-toggle="modal"
			data-bs-target={`#${id}`}
			value={value}
		>
			<label className=" me-1">Wyloguj</label>
			<BoxArrowLeft className="" />
		</button>
	);
}

export default ModalEnableLogoutBtn;
