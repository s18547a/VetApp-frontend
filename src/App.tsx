import {
	Route,
	Routes,
	Navigate,
	useNavigate,
	useLocation,
} from 'react-router-dom';
import { isAuthenticated } from './utils/authHelper';

import AnimalList from './pages/Animal/AnimalList/AnimalList';
import AnimalForm from './pages/Animal/AnimalRegister/AnimalForm';

import ReservationsList from './pages/Reservation/ReservationList/ReservationList';
import ReservationForm from './pages/Reservation/ReservationRegister/ReservationForm';
import VisitList from './pages/Visit/VisitList/VisitList';
import VisitRegister from './pages/Visit/VisitRegister/VisitForm';
import AnimalInfo from './pages/Animal/AnimalProfile/AnimalProfile';
import UserProfile from './pages/General/UserProfile';
import SurgeryForm from './pages/Surgery/SurgeryRegister/SurgeryForm';
import VisitProfile from './pages/Visit/VisitProfile/VisitProfile';
import VetList from './pages/Vet/VetList/VetList';
import { isManager, isVet } from './utils/userType';
import VetForm from './pages/Vet/VetRegister/VetForm';
import VetProfile from './pages/Vet/VetProfile/VetProfile';
import VetScheduldeForm from './pages/Vet/VetRegister/Components/VetScheduldeForm';

import HomePage from './pages/Unlogged/HomePage';
import MedicalInfoForm from './pages/Animal/AnimalRegister/Components/MedicalInfoForm';
import SurgeryList from './pages/Surgery/SurgeryList/SurgeryList';
import SurgeryProfile from './pages/Surgery/SurgeryProfile/SurgeryProfile';
import NotFoundPage from './pages/General/NotFoundPage';

import BannerComponent from './components/Banner/BannerComponent';
import FooterComponenet from './components/Footers/FooterComponent';
import SideBar from './components/Navigation/SideBar/SideBarComponent';

import ActivitiesList from './pages/Miscellaneous/Activities/ActivitiesList';
import VaccineList from './pages/Miscellaneous/Vacciness/VaccineList';

const bootstrap = require('bootstrap');
function App() {
	const naviagate = useNavigate();

	const handleLogin = (user) => {
		sessionStorage.setItem('user', user);

		naviagate('/profile');
	};
	const handleLogout = () => {
		sessionStorage.removeItem('user');

		naviagate('/');
	};

	const isLogged = (element) => {
		if (isAuthenticated()) {
			return <Navigate to="/profile" />;
		} else return element;
	};
	const isNotLogged = (element) => {
		if (isAuthenticated()) {
			return element;
		} else return <Navigate to="/" />;
	};
	const isNotPersonel = (element) => {
		if (isAuthenticated()) {
			if (isVet()) {
				return element;
			} else return <Navigate to="/profile" />;
		} else return <Navigate to="/profile" />;
	};
	const isNotManager = (elemet) => {
		if (isAuthenticated()) {
			if (isManager()) {
				return elemet;
			} else return <Navigate to="/profile" />;
		} else return <Navigate to="/profile" />;
	};
	const location = useLocation();

	const currentLocation = location.pathname;
	const style = currentLocation.includes('/profile')
		? {
				height: '100%',
				width: '100%',
		  }
		: { height: '100%', width: '100%' };

	const mainContent = isAuthenticated() ? (
		<div style={{ height: '94%', width: '100%' }} className="row m-0">
			<div className="col-lg-1 p-0 " style={{ zIndex: 3 }}>
				<SideBar />
			</div>
			<main
				style={{
					height: '100%',
				}}
				className="col-lg-11 m-0 p-0 "
			>
				<Routes>
					<Route path="/profile" element={isNotLogged(<UserProfile />)} />

					<Route path="/animals" element={isNotLogged(<AnimalList />)} />
					<Route
						path="/animals/register"
						element={isNotLogged(<AnimalForm />)}
					/>

					<Route
						path="/animals/:AnimalId"
						element={isNotLogged(<AnimalInfo />)}
					/>

					<Route
						path="/animals/:AnimalId/edit"
						element={isNotLogged(<AnimalForm />)}
					/>

					<Route
						path="/reservations/register"
						element={isNotLogged(<ReservationForm />)}
					/>
					<Route
						path="/reservations"
						element={isNotLogged(<ReservationsList />)}
					/>

					<Route path="/visits" element={isNotLogged(<VisitList />)} />
					<Route
						path="/visits/register"
						element={isNotLogged(isNotPersonel(<VisitRegister />))}
					/>

					<Route
						path="/visits/:VisitId"
						element={isNotLogged(<VisitProfile />)}
					/>

					<Route
						path="/surgeries/register"
						element={isNotLogged(isNotPersonel(<SurgeryForm />))}
					/>
					<Route path="/surgeries" element={isNotLogged(<SurgeryList />)} />

					<Route
						path="/surgeries/:SurgeryId"
						element={isNotLogged(<SurgeryProfile />)}
					/>

					<Route path="/vets" element={isNotManager(<VetList />)} />
					<Route path="/vets/register" element={isNotManager(<VetForm />)} />
					<Route path="/vets/:VetId" element={isNotManager(<VetProfile />)} />
					<Route path="/vets/:VetId/edit" element={isNotManager(<VetForm />)} />
					<Route
						path="/vets/:VetId/schedulde/edit"
						element={isNotManager(<VetScheduldeForm />)}
					/>

					<Route
						path="/animals/:AnimalId/medicalInfo/edit"
						element={isNotPersonel(<MedicalInfoForm />)}
					/>
					<Route
						path="/miscellaneous/medicalActivities"
						element={isNotManager(<ActivitiesList />)}
					/>
					<Route
						path="/miscellaneous/vacciness"
						element={isNotManager(<VaccineList />)}
					/>
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</main>
		</div>
	) : (
		<main
			style={{
				height: '94%',
			}}
		>
			<Routes>
				<Route
					path="/"
					element={isLogged(<HomePage handleLogin={handleLogin} />)}
				/>
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</main>
	);
	return (
		<div style={style} className=" p-0 m-0">
			<header
				style={{
					width: '100%',
					height: '6%',

					zIndex: 100,
				}}
			>
				<BannerComponent handleLogout={handleLogout} />
			</header>

			{mainContent}

			<div
				style={{
					width: '100%',
					height: '2%',
					position: 'fixed',
					right: 0,
					bottom: 0,
				}}
			>
				<FooterComponenet />
			</div>
		</div>
	);
}

export default App;
