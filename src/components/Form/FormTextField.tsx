import { ReactElement } from 'react';

function FormTextField({
	label,
	error,
	name,
	value,
	placeholder,
	disabled,
	onChange,
}: {
	label: string;
	error: string | undefined;
	name: string;
	value: any;
	placeholder: string;
	disabled: boolean;
	onChange;
}): ReactElement {
	return (
		<div className="form-group">
			<div className="row">
				<div className="col-12">
					<label className="form-label ">
						<h5>{label}</h5>
					</label>
				</div>

				<div className="col-12">
					<div className="row">
						<div className="col-12">
							<textarea
								className={
									error == '' || error == undefined
										? 'form-control '
										: 'form-control border border-danger'
								}
								name={name}
								onChange={onChange}
								value={value}
								placeholder={placeholder}
								disabled={disabled}
								rows={5}
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

export default FormTextField;
