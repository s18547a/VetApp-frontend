import { ReactElement, memo, useCallback } from 'react';

function FormDiv({
	label,
	type,
	error,
	name,
	onChange,
	value,
	min,
	placeholder,
	disabled,
}: {
	label: string;
	type: string | undefined;
	error: string;
	name: string;
	onChange: (any) => void;
	value: any;
	min: string;
	placeholder: string;
	disabled: boolean | undefined;
}): ReactElement {
	return (
		<div className="form-group ">
			<div className="row">
				<div className="col-12">
					<label className="form-label ">{label}</label>
				</div>

				<div className="col-12">
					<div className="row">
						<div className="col-12">
							<input
								autoComplete="disable"
								type={type}
								className={
									error == '' || error == undefined
										? 'form-control '
										: 'form-control border border-danger'
								}
								name={name}
								onChange={onChange}
								value={value}
								placeholder={placeholder}
								min={min}
								disabled={disabled}
								step={type == 'number' ? 0.01 : undefined}
								lang={'pl-PL'}
							/>
						</div>

						<div className="col-12">
							<label className="form-text text-danger ">{error}</label>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default memo(FormDiv);
