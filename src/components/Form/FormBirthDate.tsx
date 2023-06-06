import { ReactElement, useEffect, useState } from 'react';
import { getCurrentDate } from '../../utils/getCurrentDate';

function FormBirthDate({ onChange, error, value }): ReactElement {
	const [newDate, setNewDate] = useState(value);
	useEffect(() => {
		setNewDate(value);
	}, [value]);
	useEffect(() => {
		onChange(newDate);
	}, [newDate]);
	const dayList = [
		'01',
		'02',
		'03',
		'04',
		'05',
		'06',
		'07',
		'08',
		'09',
		'10',
		'11',
		'12',
		'13',
		'14',
		'15',
		'16',
		'17',
		'18',
		'19',
		'20',
		'21',
		'22',
		'23',
		'24',
		'25',
		'26',
		'27',
		'28',
		'29',
		'30',
		'31',
	];
	const monthList = [
		'01',
		'02',
		'03',
		'04',
		'05',
		'06',
		'07',
		'08',
		'09',
		'10',
		'11',
		'12',
	];
	let currentYear: number = +getCurrentDate().split('-')[0];
	let yearList: string[] = [];
	for (let i = 0; i < 30; i++) {
		const year: number = currentYear - i;
		yearList.push(year.toString());
	}

	function onChangeDay(e) {
		const { name, value } = e.target;

		const oldYear = newDate.split('-')[0];
		const oldMonth = newDate.split('-')[1];
		const nDate = `${oldYear}-${oldMonth}-${value}`;
		setNewDate(nDate);
	}
	function onChangeMonth(e) {
		const { name, value } = e.target;
		const oldDay = newDate.split('-')[2];
		const oldYear = newDate.split('-')[0];

		const nDate = `${oldYear}-${value}-${oldDay}`;
		setNewDate(nDate);
	}
	function onChangeYear(e) {
		const { name, value } = e.target;
		const oldDay = newDate.split('-')[2];

		const oldMonth = newDate.split('-')[1];
		const nDate = `${value}-${oldMonth}-${oldDay}`;
		setNewDate(nDate);
	}

	return (
		<div className="form-grop">
			<div className="row">
				<div className="col-12">
					<label className="form-label" placeholder="">
						Data urodzenia
					</label>
				</div>
			</div>
			<div className="row">
				<div className="col-4">
					<select
						className={error ? 'form-select border-danger' : ' form-select'}
						onChange={onChangeDay}
					>
						<option selected disabled></option>
						{dayList.map((day) => {
							return (
								<option
									value={day}
									selected={value.split('-')[2] == day}
									key={day}
								>
									{day}
								</option>
							);
						})}
					</select>
				</div>
				<div className="col-4">
					<select
						className={error ? 'form-select border-danger' : ' form-select'}
						onChange={onChangeMonth}
					>
						<option selected disabled></option>
						{monthList.map((month) => {
							return (
								<option
									value={month}
									selected={value.split('-')[1] == month}
									key={month}
								>
									{month}
								</option>
							);
						})}
					</select>
				</div>
				<div className="col-4">
					<select
						className={error ? 'form-select border-danger' : ' form-select'}
						onChange={onChangeYear}
					>
						<option selected disabled></option>
						{yearList.map((year) => {
							return (
								<option
									value={year}
									selected={value.split('-')[0] == year}
									key={year}
								>
									{year}
								</option>
							);
						})}
					</select>
				</div>
			</div>
			<div className="row">
				<div className=" form-text text-danger">{error}</div>
			</div>
		</div>
	);
}

export default FormBirthDate;
