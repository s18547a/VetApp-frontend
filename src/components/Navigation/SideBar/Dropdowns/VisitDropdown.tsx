import { ReactElement } from 'react';
import { ListUl, PersonPlus, PlusSquare } from 'react-bootstrap-icons';
import { useLocation } from 'react-router-dom';
import { isAuthenticated } from '../../../../utils/authHelper';
import { isOwner } from '../../../../utils/userType';
import NavBtn from '../NavBtn';
import NavElement from '../NavElement';

function VisitDropdown(): ReactElement {
	const component = () => {
		if (!isOwner() && isAuthenticated()) {
			return (
				<NavElement
					id={'visit'}
					label={'Wizyty'}
					mainLink={'/visits'}
					elements={[
						{ label: 'Lista', link: '/visits', icon: <ListUl /> },
						{
							label: 'Zarejestruj',
							link: '/visits/register',
							icon: <PlusSquare />,
						},
					]}
				/>
			);
		} else return <NavBtn link={'/visits'} label={'Wizyty'} />;
	};
	return component();
}

export default VisitDropdown;
