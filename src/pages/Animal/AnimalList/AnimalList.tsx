import { ReactElement, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Animal from '../../../classes/Animal';
import Pagination from '../../../components/List/Pagination';
import RegiserSuccessInfo from '../../../components/InfoBanners/RegisterSuccessBannerComponent';
import TableOrEmpty from '../../../components/List/TableOrEmpty';
import BreadCrumbComponent from '../../../components/Navigation/BreadCrumbComponent';
import { getCurrentUser } from '../../../utils/authHelper';
import { isOwner, isVet, isManager } from '../../../utils/userType';
import ServerErrorInfoComponenet from '../../../components/InfoBanners/ServerErrorInfoBannerComponent';

import AnimalSearch from './Components/AnimalSearch';
import { changePageTitle } from '../../../utils/otherHelper';
import CardTitleCompnenet from '../../../components/General/CardTitle';
import UpperPageStripe from '../../../components/General/UpperPageStripe';
import { AnimalApiCalls } from '../../../apiCalls/animalApiCalls';
import AnimalTable from './Components/AnimalTable';

function AnimalList(): ReactElement {
	const [animalList, setAnimalList] = useState<Animal[]>([]);

	const navigate = useNavigate();
	const [empty, setEmpty] = useState<boolean>(false);

	const location = useLocation();
	const [newId, setNewId] = useState('');

	const [pagedList, setPagedList] = useState<Animal[][]>([]);

	const [selectedPage, setSelectedPage] = useState<number>(0);

	const [serverError, setServerError] = useState(false);

	const divideListIntoPages = (visitList: Animal[]) => {
		const dowloadListLength: number = visitList.length;

		let numberOfPages = Math.ceil(dowloadListLength / 10);

		const listOfListOnPage: Animal[][] = [];
		for (let i = 0; i < numberOfPages * 10; i = i + 10) {
			const pageList: Animal[] = visitList.slice(i, i + 10);

			listOfListOnPage.push(pageList);
		}
		setPagedList(listOfListOnPage);
	};
	const animalApiCalls = new AnimalApiCalls();
	useEffect(() => {
		changePageTitle('Zwierzęta');
		const loadAnimals = async () => {
			try {
				let response;
				if (isOwner()) {
					response = await animalApiCalls.getAnimalsbyOwner(
						getCurrentUser().userId
					);
				} else if (isVet() || isManager()) {
					response = await animalApiCalls.getAnimals();
				}
				if (response) {
					if (response.status == 200) {
						const list = await response.json();
						divideListIntoPages(list);
						setAnimalList(list);
					}
					if (response.status == 500) {
						setServerError(true);
					}
					if (response.status == 404) {
						setEmpty(true);
					}
				}
			} catch (error) {
				console.log(error);
				setServerError(true);
			}
		};

		loadAnimals();

		const state = location.state as { id: string };
		if (state != null) {
			setNewId(state.id);
		}
	}, []);

	const handleSearch = async (Email: string) => {
		if (Email != '') {
			try {
				const response = await animalApiCalls.getAnimalsByOwnerEmail(Email);

				if (response) {
					if (response.status == 200) {
						setEmpty(false);
						const data = await response.json();
						divideListIntoPages(data);
						setAnimalList(data);
						navigate('/animals');
					}
					if (response.status == 404) {
						setEmpty(true);

						divideListIntoPages([]);
						setAnimalList([]);
						navigate('/animals');
					}
					if (response.status == 500) {
						setServerError(serverError);
					}
				}
			} catch (error) {
				console.log(error);
				setServerError(serverError);
			}
		}
	};

	const changePage = (e) => {
		e.preventDefault();
		const { value } = e.target;
		setSelectedPage(value);
	};

	return (
		<div className="" style={{ width: '100%', height: '100%' }}>
			<UpperPageStripe
				bredCrumbs={
					<BreadCrumbComponent
						elements={[{ label: 'Zwierzęta', active: true, link: '/animals' }]}
					/>
				}
			>
				{isVet() ? <AnimalSearch onSearch={handleSearch} /> : null}
			</UpperPageStripe>

			<div className="container">
				<ServerErrorInfoComponenet serverError={serverError} />

				<RegiserSuccessInfo
					newId={newId}
					message={'Zarejestrowane zwierzę: '}
				/>

				<div className=" card card-body shadow">
					<CardTitleCompnenet label="Zarejestrowne zwierzęta" />

					<TableOrEmpty Empty={empty}>
						<AnimalTable
							pagedList={pagedList}
							selectedPage={selectedPage}
							newId={newId}
						/>
					</TableOrEmpty>
				</div>
				<Pagination
					pagedList={pagedList}
					selectedPage={selectedPage}
					changePage={changePage}
					setSelectedPage={setSelectedPage}
				/>
			</div>
		</div>
	);
}

export default AnimalList;
