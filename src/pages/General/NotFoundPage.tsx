import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../utils/authHelper';

function NotFoundPage(): ReactElement {
	const naviagete = useNavigate();
	return (
		<div className="container d-flex w-25 mt-5">
			<div className=" card card-body ">
				<div className="d-flex flex-column text-center">
					<h5>Strona niedostępna</h5>
					<button
						className="btn btn-danger"
						onClick={() => {
							if (isAuthenticated()) {
								naviagete('/profile');
							} else {
								naviagete('/');
							}
						}}
					>
						Cofnij
					</button>
				</div>
			</div>
		</div>
	);
}

export default NotFoundPage;
