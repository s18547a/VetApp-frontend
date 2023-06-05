import { ReactElement, memo } from 'react';

function UpperPageStripe({ children, bredCrumbs }): ReactElement {
	return (
		<div
			className="mb-5 bg-white  d-flex justify-content-between shadow"
			style={{ width: '100%', height: '5%' }}
		>
			<div className="ms-4 mt-2 ">{bredCrumbs}</div>
			<div className="me-5 ">{children}</div>
			<div></div>
		</div>
	);
}
export default UpperPageStripe;
