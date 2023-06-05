function VaccineCoreCheck({ onCheck }) {
	return (
		<div className="row">
			<div className="col-12">
				<div className="form-check ">
					<input
						name={'Core'}
						type="checkbox"
						id={'core'}
						className="form-check-input "
						onChange={onCheck}
					/>
					<label htmlFor={'core'} className="form-check-label">
						{'Wymagana'}
					</label>
				</div>
			</div>
		</div>
	);
}
export default VaccineCoreCheck;
