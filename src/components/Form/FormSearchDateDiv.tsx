import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import pl from 'date-fns/locale/pl';
import { ReactElement } from 'react';
function FormSearchDateDiv({
	name,
	label,
	value,
	onChange,
}: {
	name: string;
	label: string;
	value: string | undefined | null;
	onChange(e);
}): ReactElement {
	function onChangeSub(e) {
		const date: string = e.toISOString().split('T')[0];
		const ot = new Date(date);
		ot.setDate(ot.getDate() + 1);

		const otString = ot.toISOString().split('T')[0];

		const eP = { target: { value: otString, name: name } };
		onChange(eP);
	}

	return (
		<div className="form-group">
			<div className="d-flex align-items-center">
				<DatePicker
					className={'form-select form-select-sm'}
					onChange={onChangeSub}
					placeholderText={label}
					locale={pl}
					name={name}
					value={value}
					dateFormat="yyyy-MM-dd"
					showMonthDropdown
					showYearDropdown
					e
					onKeyDown={(e) => {
						e.preventDefault();
					}}
				/>
			</div>
		</div>
	);
}
export default FormSearchDateDiv;
