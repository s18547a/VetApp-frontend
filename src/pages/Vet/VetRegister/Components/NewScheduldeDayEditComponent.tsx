function NewScheduldeDayEditComponent({ value, onChange, name, error }) {
	return (
		<input
			className={
				error ? 'border border-0 text-danger  w-75' : 'border border-0 w-75'
			}
			placeholder="XX:00-XX:00"
			value={value}
			name={name}
			onChange={onChange}
		></input>
	);
}

export default NewScheduldeDayEditComponent;
