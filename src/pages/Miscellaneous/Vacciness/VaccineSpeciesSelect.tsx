import { memo } from 'react';

function VaccineSpeciesSelect({ error, speciesList, onChange }) {
	return (
		<div className="row">
			<div className="col-12">
				<div className="col-lg-3 col-md-12">
					<label htmlFor="exampleDataListA" className="form-label ">
						Zwierzę
					</label>
				</div>
			</div>
			<div className="col-12">
				<select
					name={'Species'}
					onChange={onChange}
					className={
						error.Species == ''
							? 'form-select '
							: 'form-select border border-danger'
					}
				>
					<option value="" disabled selected>
						Wybierz
					</option>

					{speciesList.map((element) => {
						return (
							<option
								key={element}
								value={element == null ? 'Ogolna' : element}
								label={element == null ? 'Ogolna' : element}
							/>
						);
					})}
				</select>
			</div>
			<div className="col-12">
				<label className="form-text text-danger ">{error.Species}</label>
			</div>
		</div>
	);
}

export default memo(VaccineSpeciesSelect);
