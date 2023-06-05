import { ReactElement, useState } from 'react';

import { useLocation } from 'react-router-dom';

function NavBtn(props: { link: string; label: string }): ReactElement {
	const location = useLocation().pathname;

	return (
		<div className={' border-bottom '} style={{}}>
			<li>
				<a
					className={'text-decoration-none btn btn-group-toggle '}
					aria-current="page"
					href={props.link}
				>
					<label className={' text-black lead'}>{props.label}</label>
				</a>
			</li>
		</div>
	);
}

export default NavBtn;
