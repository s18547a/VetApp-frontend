import { ReactElement } from 'react';

function FormSearchDiv({
	type,
	name,
	value,
	label,
	min,
	disabled,
	onChange,
}: {
	type: string;
	name: string;
	value: string;
	label: string;
	min: string;
	disabled: boolean;
	onChange;
}): ReactElement {
	return (
		<div className="form-group">
			<div className="align-items-center d-flex ">
				<input
					type={type}
					className={'form-control form-control-sm'}
					name={name}
					onChange={onChange}
					value={value}
					placeholder={label}
					min={min}
					disabled={disabled}
					step={type == 'number' ? 0.01 : undefined}
					lang={'pl-PL'}
				/>
			</div>
		</div>
	);
}

export default FormSearchDiv;
