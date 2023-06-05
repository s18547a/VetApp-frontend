import { ListUl, PlusSquare } from 'react-bootstrap-icons';
import NavElement from '../NavElement';

function MiscellaneousDropdown() {
	return (
		<NavElement
			id={'add'}
			mainLink={'/miscellaneous'}
			label={'Różne'}
			elements={[
				{ label: 'Szczepionki', link: '/miscellaneous/vacciness', icon: null },
				{
					label: 'Aktywności ',
					link: '/miscellaneous/medicalActivities',
					icon: null,
				},
			]}
		/>
	);
}

export default MiscellaneousDropdown;
