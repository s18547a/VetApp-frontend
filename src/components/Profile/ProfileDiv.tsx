function ProfileDiv(props) {
	return (
		<div className="row mt-2 ">
			<div className="col-6">
				<label className="">{props.label}</label>
			</div>
			<div className="col-6">
				<label className="text-muted" style={{ color: 'black' }}>
					{props.value}
				</label>
			</div>
		</div>
	);
}

export default ProfileDiv;
