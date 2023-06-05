import { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';
import { bannerColor } from '../../../assets/colors/bannerColor';
import { isAuthenticated } from '../../../utils/authHelper';
import { isOwner, isVet, isManager } from '../../../utils/userType';
import AdditionalInfo from './Dropdowns/MiscellaneousDropdown';
import AnimalDropdown from './Dropdowns/AnimalDropdown';
import ReservationDropdown from './Dropdowns/ReservationDropdown';
import SurgeryDropdown from './Dropdowns/SurgeryDropdown';
import UserProfileDropdown from './Dropdowns/UserProfileDropdown';
import VetDropdown from './Dropdowns/VetDropdown';
import VisitDropdown from './Dropdowns/VisitDropdown';
import MiscellaneousDropdown from './Dropdowns/MiscellaneousDropdown';

function SideBar(): ReactElement | null {
	const vetNav: ReactElement = (
		<>
			<UserProfileDropdown />

			<AnimalDropdown />

			<ReservationDropdown />

			<VisitDropdown />

			<SurgeryDropdown />
		</>
	);

	const vetManagerNav: ReactElement = (
		<>
			<UserProfileDropdown />

			<AnimalDropdown />

			<ReservationDropdown />

			<VisitDropdown />

			<SurgeryDropdown />

			<VetDropdown />
			<MiscellaneousDropdown />
		</>
	);

	const ownerNav: ReactElement = (
		<>
			<UserProfileDropdown />
			<AnimalDropdown />
			<ReservationDropdown />

			<VisitDropdown />

			<SurgeryDropdown />
		</>
	);

	const userNaviagion = () => {
		if (!isAuthenticated()) {
			return null;
		} else if (isOwner()) {
			return ownerNav;
		} else {
			if (isVet() && isManager()) {
				return vetManagerNav;
			} else if (isVet() && !isManager()) {
				return vetNav;
			} else null;
		}
	};

	const authorizatedSideBar = () => {
		if (isAuthenticated()) {
			return (
				<ul
					className="list-unstyled shadow bg-white"
					style={{
						height: '100%',
						backgroundColor: '',
					}}
				>
					{userNaviagion()}
				</ul>
			);
		} else return null;
	};

	return authorizatedSideBar();
}

export default SideBar;
