import { useEffect, useState } from 'react';
import Modal from '../Modal/Modal';

import { getCurrentUser, isAuthenticated } from '../../utils/authHelper';
import { getDefaultProfileImage, getLogo } from '../../utils/imageHelper';
import { getUserName, isManager, isOwner, isVet } from '../../utils/userType';
import { bannerColor } from '../../assets/colors/bannerColor';
import ModalEnableLogoutBtn from '../Modal/ModalEnableLogoutBtn';

function BannerComponent({ handleLogout }: { handleLogout: () => void }) {
	let logoutBtn: JSX.Element = (
		<ModalEnableLogoutBtn
			className="btn  btn-danger btn-sm"
			id={'logoutModal'}
			value={''}
		/>
	);

	const [userType, setUserType] = useState<string>('');

	useEffect(() => {
		if (isAuthenticated()) {
			if (isOwner()) {
				setUserType('Właściciel');
			} else if (isVet() && !isManager()) {
				setUserType('Weterynarz');
			} else if (isManager()) {
				setUserType('Menadżer');
			}
		}
	}, []);

	const userBanner = (): JSX.Element => {
		return isAuthenticated() ? (
			<>
				<Modal
					label={'Czy na pewno?'}
					function={handleLogout}
					id={'logoutModal'}
				/>

				<nav
					className="nav navbar-dark  "
					style={{
						background: bannerColor,
						width: '100%',
						height: '100%',
					}}
				>
					<div
						className="row justify-content-lg-between justify-content-md-between "
						style={{ width: '100%' }}
					>
						<div className="col-6 ">
							<div className="row">
								<div className="col-2">
									<img height="60px" width="90px" src={getLogo()} />
								</div>
							</div>
						</div>
						<div className="col-6   row justify-content-end ">
							{isVet() && (
								<div className=" col-lg-auto col-md-auto col-4 d-flex align-items-center">
									{isVet() && (
										<img
											height="50px"
											width="50px"
											src={
												getCurrentUser().ProfileImage == null
													? getDefaultProfileImage()
													: getCurrentUser().ProfileImage
											}
										/>
									)}
								</div>
							)}
							<div className="col-lg-auto col-md-auto   align-self-center  d-none d-md-block d-lg-block">
								<div className="d-flex flex-column">
									<label
										className="text-white mt-0 fw-bold "
										style={{ fontWeight: '130' }}
									>{`${getUserName()}`}</label>
									<label
										className=" text-white mt-1 "
										style={{ fontWeight: '130' }}
									>{` ${getCurrentUser().Email}`}</label>
								</div>
							</div>

							<div className="col-lg-auto col-md-auto  col-4 align-self-center p-0">
								{logoutBtn}
							</div>
						</div>
					</div>
				</nav>
			</>
		) : (
			<nav
				className=" nav navbar-dark  sticky-top d-flex justify-content-center aling-items-center"
				style={{ background: '#3373C4', height: '100%', width: '100%' }}
			>
				<div className="row align-content-center">
					<div className="col-6 ">
						<img height="58px" width="60px" src={getLogo()} />
					</div>
					<div className="col-6">
						<div
							className="col-6  d-flex justify-content-center"
							style={{ color: 'white' }}
						>
							<h4 className=" display-5">Klinka </h4>
							<h4 className="display-5"> Vet</h4>
						</div>
					</div>
				</div>
			</nav>
		);
	};

	return userBanner();
}

export default BannerComponent;
