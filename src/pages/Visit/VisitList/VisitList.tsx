import { ReactElement, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { VisitApiCalls } from '../../../apiCalls/visitApiCalls';
import Visit from '../../../classes/Visit';
import Pagination from '../../../components/List/Pagination';
import RegiserSuccessInfo from '../../../components/InfoBanners/RegisterSuccessBannerComponent';
import TableOrEmpty from '../../../components/List/TableOrEmpty';
import BreadCrumbComponent from '../../../components/Navigation/BreadCrumbComponent';
import { getCurrentUser } from '../../../utils/authHelper';
import { SearchListParamter } from '../../../utils/VisitListParameters';
import { isVet, isManager, isOwner } from '../../../utils/userType';
import ServerErrorInfoComponenet from '../../../components/InfoBanners/ServerErrorInfoBannerComponent';
import VisitSearch from './Components/VisitSearch';
import { changePageTitle } from '../../../utils/otherHelper';
import CardTitleCompnenet from '../../../components/General/CardTitle';
import UpperPageStripe from '../../../components/General/UpperPageStripe';
import VisitTable from './Components/VisitTable';

function VisitList(): ReactElement {
	const [visitList, setVisitList] = useState<Visit[]>([]);
	const [empty, setEmpty] = useState<boolean>(true);
	const visitApiCalls = new VisitApiCalls();

	const navigate = useNavigate();
	const [newId, setNewId] = useState('');
	const location = useLocation();

	const [pagedList, setPagedList] = useState<Visit[][]>([]);
	const [selectedPage, setSelectedPage] = useState<number>(0);

	const [serverError, setServerError] = useState(false);

	const divideListIntoPages = (visitList: Visit[]) => {
		const dowloadListLength: number = visitList.length;

		let numberOfPages = Math.ceil(dowloadListLength / 10);

		const listOfListOnPage: Visit[][] = [];
		for (let i = 0; i < numberOfPages * 10; i = i + 10) {
			const pageList: Visit[] = visitList.slice(i, i + 10);

			listOfListOnPage.push(pageList);
		}
		setPagedList(listOfListOnPage);
	};

	const loadVisits = async (): Promise<any> => {
		changePageTitle('Wizyty');
		try {
			const curretUserId = getCurrentUser().userTypeId;
			let response;
			if (isVet() || isManager()) {
				response = await visitApiCalls.getVisitList();
			}
			if (isOwner()) {
				response = await visitApiCalls.getVisitListByOwner(curretUserId);
			}
			if (response) {
				if (response.status == 200) {
					const data = await response.json();
					setVisitList(data);
					setEmpty(false);
					divideListIntoPages(data);
				}
				if (response.status == 404) {
					setEmpty(true);
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

	useEffect(() => {
		loadVisits();

		const state = location.state as { id: string };
		if (state != null) {
			setNewId(state.id);
		}
	}, []);

	async function handleSearch(paramters: SearchListParamter) {
		try {
			const response = await visitApiCalls.searchVisitList(paramters);
			if (response) {
				const data = await response.json();
				if (response.status == 200) {
					setEmpty(false);
					setVisitList(data);
					divideListIntoPages(data);
					navigate('/visits');
				}
				if (response.status == 404) {
					setEmpty(true);
					setVisitList([]);
					divideListIntoPages(data);
					navigate('/visits');
				}
				if (response.status == 500) {
					setServerError(true);
				}
			}
		} catch (error) {
			console.log(error);
			setServerError(true);
		}
	}

	const changePage = (e) => {
		e.preventDefault();
		const { name, value } = e.target;
		setSelectedPage(value);
	};

	return (
		<div>
			<UpperPageStripe
				bredCrumbs={
					<BreadCrumbComponent
						elements={[{ label: 'Wizyty', active: true, link: '' }]}
					/>
				}
			>
				<VisitSearch onSearch={handleSearch} />
			</UpperPageStripe>
			<div className="container">
				<ServerErrorInfoComponenet serverError={serverError} />

				<RegiserSuccessInfo newId={newId} message={'Nowa wizyta: '} />

				<div className="card card-body shadow ">
					<CardTitleCompnenet label="Odbyte wizyty" />
					<TableOrEmpty Empty={empty}>
						<VisitTable
							selectedPage={selectedPage}
							pagedList={pagedList}
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

export default VisitList;
