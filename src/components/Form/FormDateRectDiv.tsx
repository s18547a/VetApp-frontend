import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import pl from 'date-fns/locale/pl';
import { ReactElement, memo, useState } from 'react';
function FormDateReactDiv({
	filter,
	onChange,
	label,
	error,
	value,
	disabled,
	selected,
	min,
	name,
}): ReactElement {
	const [counter, setCounter] = useState(0);
	function onChangeF(e) {
		const date: string = e.toISOString().split('T')[0];
		const ot = new Date(date);
		ot.setDate(ot.getDate() + 1);
		const otD = ot.toISOString().split('T')[0];
		//const newDate = ot.toISOString().split('T')[0];
		if (filter) {
			if (counter == 0) {
				onChange(ot);
				setCounter(1);
			} else onChange(date);
		} else {
			onChange(otD);
		}
	}

	return (
		<div className="form-group">
			<div className="row">
				<div className="col-12">
					<label className="form-label ">{label}</label>
				</div>

				<div className="col-12">
					<div className="row">
						<div className="col-12">
							<DatePicker
								className={
									error == ''
										? 'form-select '
										: 'form-select border border-danger'
								}
								onChange={onChangeF}
								filterDate={filter}
								locale={pl}
								name="date"
								value={value}
								dateFormat="yyyy-MM-dd"
								showMonthDropdown
								showYearDropdown
								selected={selected}
								onKeyDown={(e) => {
									e.preventDefault();
								}}
								disabled={disabled}
								minDate={new Date(min)}
								popperPlacement="bottom-start"
								autoComplete="disable"
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
export default memo(FormDateReactDiv);
