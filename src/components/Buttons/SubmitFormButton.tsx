import { ReactElement, memo } from 'react';
import { CheckLg } from 'react-bootstrap-icons';

function SubmitFormButton({
	label,
	disable,
}: {
	label: string;
	disable: boolean;
}): ReactElement {
	return (
		<button
			type="submit"
			className=" btn btn-primary "
			style={{ background: 'green' }}
			disabled={disable}
		>
			{label}
			<CheckLg />
		</button>
	);
}

export default memo(SubmitFormButton);
