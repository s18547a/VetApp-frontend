function ProfileDivVertical(props) {
	return (
		<div className=" d-flex flex-column">
			<label className="">{props.label}</label>

			<label className="text-muted" style={{ color: 'black' }}>
				{props.value}
			</label>
		</div>
	);
}

export default ProfileDivVertical;
