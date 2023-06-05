import { ReactElement } from 'react';

function FormCheck({
	name,
	label,
	error,
	elements,
	selected,
	onChange,
}: {
	name;
	label: string;
	error: string;
	elements: { value: string | number; id: string; label: string }[];
	selected: string | undefined | boolean | null;
	onChange(e);
}): ReactElement {
	function handleChange(e) {
		onChange(e);
	}

	return (
		<div className="form-group ">
			<div className="row">
				<div className="col-12">
					<div className="row">
						<div className="col-3">
							<label className="form-label ">{label}</label>
						</div>
						<div className="col-6">
							<label className="form-text text-danger">{error}</label>
						</div>
					</div>
				</div>
				<div className="col-12">
					<div className="row">
						{elements.map((element) => {
							return (
								<div className="col-12" key={element.id}>
									<div className="form-check ">
										<input
											name={name}
											type="radio"
											id={element.id}
											value={element.value}
											className="form-check-input "
											onChange={handleChange}
											checked={selected == element.value}
										/>
										<label htmlFor={element.id} className="form-check-label">
											{element.label}
										</label>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}

export default FormCheck;
