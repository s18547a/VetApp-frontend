import { ReactElement, useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { ReservationApiCalls } from '../../../apiCalls/reservationApiCalls';
import { SurgeryApiCalls } from '../../../apiCalls/surgeryApiCalls';
import { VetApiCalls } from '../../../apiCalls/vetApiCalls';
import Reservation from '../../../classes/Reservation';
import Surgery from '../../../classes/Surgery';
import Vet from '../../../classes/Vet';
import BreadCrumbComponent from '../../../components/Navigation/BreadCrumbComponent';
import { getCurrentUser } from '../../../utils/authHelper';
import { isManager } from '../../../utils/userType';
import ServerErrorInfoComponenet from '../../../components/InfoBanners/ServerErrorInfoBannerComponent';

import TodayReservationList from './Components/TodayReservationList';

import VetProfileTab from './Components/VetProfileMain';
import { getCurrentDate } from '../../../utils/getCurrentDate';
import { changePageTitle } from '../../../utils/otherHelper';
import UpperPageStripe from '../../../components/General/UpperPageStripe';
import RegisterSuccessBannerComponent from '../../../components/InfoBanners/RegisterSuccessBannerComponent';
function VetProfile(): ReactElement {
	const params = useParams();
	const location = useLocation();
	const [serverError, setServerError] = useState<boolean>(false);

	const [vet, setVet] = useState<Vet>({
		VetId: undefined,
		Name: undefined,
		LastName: undefined,
		Contact: undefined,
		Email: undefined,
		HireDate: undefined,
		ProfileImage: undefined,
		Types: [],
	});

	const [todayReservationList, setTodayReservations] = useState<Reservation[]>(
		[]
	);

	const [todaySurgeriesList, setTodaySurgeries] = useState<Surgery[]>([]);

	const [todaySchedulde, setTodaySchedulde] = useState<string[]>([]);

	const reservationApiCalls = new ReservationApiCalls();
	const surgeryApiCalls = new SurgeryApiCalls();
	const vetApiCalls = new VetApiCalls();

	useEffect(() => {
		changePageTitle('Profil');
		let VetId = getCurrentUser().userTypeId;
		if (location.pathname == '/profile') {
			VetId = getCurrentUser().userTypeId;
		} else {
			VetId = params.VetId;
		}

		const loadVet = async () => {
			try {
				const response = await vetApiCalls.getVetByVetId(VetId);
				if (response) {
					if (response.status == 200) {
						setVet(await response.json());
					}
					if (response.status == 404) {
						setServerError(true);
					}

					if (response.status == 500) {
						setServerError(true);
					}
				}
			} catch (error) {
				setServerError(true);
				console.log(true);
			}
		};

		const loadVetReservations = async () => {
			try {
				const response = await reservationApiCalls.getTodayReservationsByVetId(
					VetId
				);
				if (response) {
					if (response.status == 200) {
						setTodayReservations(await response.json());
					}
					if (response.status == 404) {
						setTodayReservations([]);
					}
					if (response.status == 500) {
						setServerError(true);
					}
				}
			} catch (error) {
				setServerError(true);
				console.log(error);
			}
		};

		const loadVetSurgeries = async () => {
			try {
				const response = await surgeryApiCalls.getTodaySurgeries(VetId);
				if (response) {
					if (response.status == 200) {
						setTodaySurgeries(await response.json());
					}
					if (response.status == 404) {
						setTodaySurgeries([]);
					}
					if (response.status == 500) {
						setServerError(true);
					}
				}
			} catch (error) {
				console.log(error);
				setServerError(true);
			}
		};

		const loadTodaySchedulde = async () => {
			try {
				const response = await vetApiCalls.getTodaySchedulde(
					getCurrentDate(),
					VetId
				);
				if (response) {
					if (response.status == 200) {
						setTodaySchedulde(await response.json());
					}
					if (response.status == 404) {
					}
					if (response.status == 500) {
						setServerError(true);
					}
				}
			} catch (error) {
				console.log(error);
				setServerError(true);
			}
		};

		loadVet();
		loadVetReservations();
		loadVetSurgeries();
		loadTodaySchedulde();
		const state = location.state as { updated: boolean };
		if (state != null) {
			setUpdatedSchedulde(state.updated);
		}
	}, []);

	const [updatedSchedulde, setUpdatedSchedulde] = useState(false);

	return (
		<div className="">
			<UpperPageStripe
				bredCrumbs={
					isManager() && vet.VetId != getCurrentUser().userId ? (
						<BreadCrumbComponent
							elements={[
								{ label: 'Weterynarze', active: false, link: '/vets' },
								{
									label: 'Profil',
									active: true,
									link: '',
								},
							]}
						/>
					) : (
						<BreadCrumbComponent
							elements={[{ label: 'Profil', active: true, link: '/' }]}
						/>
					)
				}
			>
				{}
			</UpperPageStripe>
			<div className="container">
				<ServerErrorInfoComponenet serverError={serverError} />
				<RegisterSuccessBannerComponent
					newId={updatedSchedulde ? vet.VetId : ''}
					message={'Zaktuazliowano: '}
				/>

				<div className="row ">
					<div className="col-12">
						<VetProfileTab
							vet={vet}
							types={vet.Types}
							vetId={params.VetId}
							setServerError={() => {
								setServerError(true);
							}}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-12 mt-5">
						<TodayReservationList
							visitList={todayReservationList}
							surgeryList={todaySurgeriesList}
							schedulde={todaySchedulde}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default VetProfile;
