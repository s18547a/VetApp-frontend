import { ReactElement } from 'react';
import { DoorClosed } from 'react-bootstrap-icons';

function ModalEnableBtn({
	className,
	id,
	onClick,
	value,
	label,
	icon,
}: {
	className: string;
	id: string;
	onClick: (any) => any;
	value: any;
	label: string;
	icon: any;
}): ReactElement {
	return (
		<button
			className={`${className}  d-flex`}
			type="button"
			data-bs-toggle="modal"
			data-bs-target={`#${id}`}
			onClick={onClick}
			value={value}
		>
			{label}
			<div className=" ms-1">{icon}</div>
		</button>
	);
}

export default ModalEnableBtn;
