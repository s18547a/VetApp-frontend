import { ReactElement, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { AnimalApiCalls } from '../../../apiCalls/animalApiCalls';
import { OwnerApiCalls } from '../../../apiCalls/ownerApiCalls';
import Animal from '../../../classes/Animal';
import AnimalMedicalInfo from '../../../classes/AnimalMedicalInfo';
import Illness from '../../../classes/Illness';
import Owner from '../../../classes/Owner';
import Vaccination from '../../../classes/Vaccination';
import VaccineType from '../../../classes/VaccineType';
import BreadCrumbComponent from '../../../components/Navigation/BreadCrumbComponent';
import { getCurrentDate } from '../../../utils/getCurrentDate';
import ServerErrorInfoComponenet from '../../../components/InfoBanners/ServerErrorInfoBannerComponent';
import AnimalIllnesses from './Components/AnimalIllnesses';
import AnimalMainInfo from './Components/AnimalMainInfo';

import AnimalVaccines from './Components/AnimalVaccines';
import MedicalInfo from './Components/MedicalInfo';
import PageNavigationComponent from '../../../components/Navigation/PageNavigation/PageNavigationComponent';
import UpperPageStripe from '../../../components/General/UpperPageStripe';
import { VaccineApiCalls } from '../../../apiCalls/vaccineApiCalls';
import RegisterSuccessBannerComponent from '../../../components/InfoBanners/RegisterSuccessBannerComponent';

function AnimalProfile(): ReactElement {
	const vaccineApiCalls = new VaccineApiCalls();
	const [animal, setAnimal] = useState<Animal>();
	const param = useParams();

	const [illnessList, setIllnessList] = useState<Illness[]>([]);
	const [owner, setOwner] = useState<Owner>();
	const [medicalInfo, setMedicalInfo] = useState<AnimalMedicalInfo>();
	const [vaccineList, setVaccineList] = useState<Vaccination[]>([]);
	const [serverError, setServerError] = useState(false);
	const [coreVaccinesList, setCoreVaccinesList] = useState<VaccineType[]>([]);

	const [selectedTab, setSelectedTab] = useState('');
	const location = useLocation();
	const [updatedId, setUpadtedId] = useState('');
	useEffect(() => {
		loadAnimal();
		loadMedicalInfo();
		loadIllnesses();
		loadAnimalVaccines();
		loadAnimalCoreVaccines();
		const state = location.state as { id: string };
		if (state != null) {
			setUpadtedId(state.id);
		}
	}, []);

	const animalApiCalls = new AnimalApiCalls();
	const ownerApiCalls = new OwnerApiCalls();
	const loadAnimal = async () => {
		let animalOwnerId;
		try {
			if (param.AnimalId) {
				const response = await animalApiCalls.getAnimalById(param.AnimalId);
				if (response) {
					if (response.status == 200) {
						const animal = await response.json();
						setAnimal(animal);
						animalOwnerId = animal.OwnerId;

						const secondResponse = await ownerApiCalls.getOwnerById(
							animalOwnerId
						);
						if (secondResponse) {
							if (secondResponse.status == 200) {
								setOwner(await secondResponse.json());
							}
							if (
								secondResponse.status == 404 ||
								secondResponse.status == 500
							) {
								setServerError(true);
							}
						}
					}
					if (response.status == 404 || response.status == 500) {
						setServerError(true);
					}
				}
			}
		} catch (error) {
			console.log(error);
			setServerError(true);
		}
	};

	const loadMedicalInfo = async () => {
		if (param.AnimalId) {
			try {
				const response = await animalApiCalls.getAnimalMedicalInfo(
					param.AnimalId
				);

				if (response) {
					if (response.status == 200) {
						setMedicalInfo(await response.json());
					} else if (response.status == 404 || response.status == 500) {
						setServerError(true);
					}
				}
			} catch (error) {
				setServerError(true);
			}
		}
	};

	const loadIllnesses = async () => {
		try {
			const response = await animalApiCalls.getAnimalIllnesses(param.AnimalId);
			if (response) {
				if (response.status == 200) {
					setIllnessList(await response.json());
					return true;
				}
				if (response.status == 404) {
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

	const loadAnimalVaccines = async () => {
		try {
			const response = await vaccineApiCalls.getAnimalVaccines(param.AnimalId);

			if (response) {
				if (response.status == 200) {
					setVaccineList(await response.json());
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

	const loadAnimalCoreVaccines = async (): Promise<void> => {
		try {
			const response = await vaccineApiCalls.getAnimalCoreVaccines(
				param.AnimalId
			);
			if (response) {
				if (response.status == 200) {
					setCoreVaccinesList(await response.json());
				}
				if (response.status == 500) {
					setServerError(true);
				}
				if (response.status == 404) {
					setCoreVaccinesList([]);
				}
			}
		} catch (error) {
			console.log(error);
			setServerError(true);
		}
	};

	const setSelectedTabFunction = (e) => {
		const { name, value } = e.target;

		setSelectedTab(value);
	};

	const updateIllness = async (illness) => {
		illness = JSON.parse(illness);

		const illnessToUpdate = {
			AnimalId: illness.AnimalId,
			VisitId: illness.VisitId,
			Description: illness.Description,
			RecoveryDate: getCurrentDate(),
		};

		try {
			const response = await animalApiCalls.setRecoveryIllness(illnessToUpdate);
			if (response) {
				if (response.status == 201) {
					loadIllnesses();
				} else if (response.status == 500) {
					setServerError(true);
				}
			}
		} catch (error) {
			setServerError(true);
		}
	};

	const setPage = (): JSX.Element => {
		if (selectedTab === '') {
			return <AnimalMainInfo animal={animal} owner={owner} />;
		} else if (selectedTab == 'ill') {
			return (
				<AnimalIllnesses
					illnessList={illnessList}
					updateIllness={updateIllness}
				/>
			);
		} else if (selectedTab == 'add') {
			return (
				<MedicalInfo medicalInfo={medicalInfo} animalId={animal?.AnimalId} />
			);
		} else if (selectedTab == 'vacc') {
			return (
				<AnimalVaccines vaccineList={vaccineList} coreList={coreVaccinesList} />
			);
		} else return <div></div>;
	};

	return (
		<div className="" style={{ width: '100%', height: '100%' }}>
			<UpperPageStripe
				bredCrumbs={
					<BreadCrumbComponent
						elements={[
							{ label: 'Zwierzęta', active: false, link: '/animals' },
							{ label: 'Profil', active: true, link: '' },
						]}
					/>
				}
			>
				<PageNavigationComponent
					buttons={[
						{ value: '', label: 'Profil' },
						{ value: 'ill', label: 'Choroby' },
						{ value: 'add', label: 'Zdrowie' },
						{ value: 'vacc', label: 'Szczepienia' },
					]}
					selectedTab={selectedTab}
					onChange={setSelectedTabFunction}
				/>
			</UpperPageStripe>
			<div className="container">
				<ServerErrorInfoComponenet serverError={serverError} />
				<RegisterSuccessBannerComponent
					newId={updatedId}
					message={'Zaktualizowano: '}
				/>

				{setPage()}
			</div>
		</div>
	);
}

export default AnimalProfile;
