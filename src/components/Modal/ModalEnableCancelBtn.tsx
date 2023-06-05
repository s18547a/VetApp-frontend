import { ReactElement } from 'react';
import { XCircle, XCircleFill } from 'react-bootstrap-icons';

function MondalEnableCancelBtn(props): ReactElement {
	return (
		<button
			className={`${props.className} btn btn-danger btn-sm d-flex`}
			type="button"
			data-bs-toggle="modal"
			data-bs-target={`#${props.id}`}
			onClick={props.onClick}
			value={props.value}
			style={{}}
			data-bs-toogle=" tooltip"
			data-bs-placement="top"
			title="Usuń"
		>
			Usuń
			<div className="ms-1">{props.icon}</div>
		</button>
	);
}

export default MondalEnableCancelBtn;
