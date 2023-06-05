import { ReactElement } from 'react';

function FormSelectLimit({
	label,
	name,
	error,
	array,
	id,
	elementLabel,
	selected,
	selectedValue,
	onChange,
	arrayIsObjectList,
}: {
	label: string;
	name: string;
	error: string | undefined;
	array: any[];
	id: string;
	elementLabel: string;
	selected: boolean;
	selectedValue: string;
	onChange;
	arrayIsObjectList: boolean;
}): ReactElement {
	return (
		<div className="row">
			<div className="col-12">
				<div className="col-lg-3 col-md-12">
					<label htmlFor="exampleDataListA" className="form-label ">
						{label}
					</label>
				</div>
			</div>
			<div className="col-12">
				<select
					name={name}
					onChange={onChange}
					className={
						error == '' ? 'form-select ' : 'form-select border border-danger'
					}
				>
					<option value="" disabled selected>
						Wybierz
					</option>

					{array.map((element) => {
						return arrayIsObjectList ? (
							<option
								key={element[id]}
								value={element[id]}
								label={element[elementLabel]}
								selected={
									selected
										? selectedValue == element[id]
											? true
											: false
										: undefined
								}
							/>
						) : (
							<option key={element} value={element} label={element} />
						);
					})}
				</select>
			</div>
			<div className="col-12">
				<label className="form-text text-danger ">{error}</label>
			</div>
		</div>
	);
}

export default FormSelectLimit;
