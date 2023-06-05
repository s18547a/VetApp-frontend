import { ReactElement, useState } from 'react';

import HomePageNavigation from './Components/HomePageNavigation';

import InfoPage from './Components/InfoPage';
import LoginForm from './Components/LoginForm';
import MainPageCaroseul from './Components/MainPageCaroseul';

import RegisterPage from './Components/RegisterPage';

function HomePage({
	handleLogin,
}: {
	handleLogin: (any) => void;
}): ReactElement {
	function handleLoginFunction(e) {
		handleLogin(e);
	}

	document.title = 'Klinika Vet';
	const [selectedTab, setSelectedTab] = useState('login');

	const selectedComponent = () => {
		if (selectedTab == 'login') {
			return <LoginForm handleLogin={handleLoginFunction} />;
		}
		if (selectedTab == 'sch') {
			return <InfoPage />;
		}
		if (selectedTab == 'register') {
			return <RegisterPage handleLoginFunction={handleLoginFunction} />;
		}
	};

	const changeTab = (e): void => {
		const { name, value } = e.target;

		setSelectedTab(value);
	};

	return (
		<div className=" row p-0 m-0" style={{ height: '100%', width: '100%' }}>
			<div className="col-lg-6 p-0 col-12">
				<MainPageCaroseul />
			</div>

			<div className="col-lg-6 p-0 col-12">
				<HomePageNavigation selectedTab={selectedTab} changeTab={changeTab} />

				<div className="">{selectedComponent()}</div>
			</div>
		</div>
	);
}

export default HomePage;
