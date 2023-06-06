import { memo } from 'react';

function CardTitleCompnenet({ label }: { label: string }) {
	return (
		<div className=" card-title">
			<h5 className=" ">{label}</h5>
		</div>
	);
}

export default memo(CardTitleCompnenet);
