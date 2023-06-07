import { useState, useEffect, ReactElement } from 'react';

import { useLocation } from 'react-router-dom';

import { SurgeryApiCalls } from '../../../apiCalls/surgeryApiCalls';
import Surgery from '../../../classes/Surgery';
import Pagination from '../../../components/List/Pagination';
import RegiserSuccessInfo from '../../../components/InfoBanners/RegisterSuccessBannerComponent';
import TableOrEmpty from '../../../components/List/TableOrEmpty';
import BreadCrumbComponent from '../../../components/Navigation/BreadCrumbComponent';
import { getCurrentUser } from '../../../utils/authHelper';

import { isVet, isManager, isOwner } from '../../../utils/userType';
import { SearchListParamter } from '../../../utils/VisitListParameters';
import ServerErrorInfoComponenet from '../../../components/InfoBanners/ServerErrorInfoBannerComponent';
import VisitSearch from '../../Visit/VisitList/Components/VisitSearch';
import { changePageTitle } from '../../../utils/otherHelper';
import CardTitleCompnenet from '../../../components/General/CardTitle';
import UpperPageStripe from '../../../components/General/UpperPageStripe';
import SurgeryTable from './Components/SurgeryTable';

function SurgeryList(): ReactElement {
	const location = useLocation();

	const [message, setMessage] = useState({
		id: '',
		message: '',
	});

	const [surgeryList, setSurgeryList] = useState<Surgery[]>([]);

	const [empty, setEmpty] = useState<boolean>(false);

	const [pagedList, setPagedList] = useState<Surgery[][]>([]);
	const [selectedPage, setSelectedPage] = useState<number>(0);

	const [serverError, setServerError] = useState(false);

	const divideListIntoPages = (visitList: Surgery[]): void => {
		const dowloadListLength: number = visitList.length;

		let numberOfPages = Math.ceil(dowloadListLength / 10);

		const listOfListOnPage: Surgery[][] = [];
		for (let i = 0; i < numberOfPages * 10; i = i + 10) {
			const pageList: Surgery[] = visitList.slice(i, i + 10);

			listOfListOnPage.push(pageList);
		}
		setPagedList(listOfListOnPage);
	};
	const surgeryApiCalls = new SurgeryApiCalls();
	const loadSurgeryList = async () => {
		const currentUserId = getCurrentUser().userTypeId;
		try {
			let response;

			if (isManager()) {
				response = await surgeryApiCalls.getSurgeries();
			} else if (isOwner()) {
				response = await surgeryApiCalls.getSurgeriesByOwner(currentUserId);
			} else {
				if (isVet()) {
					response = await surgeryApiCalls.getSurgeriesByVet(currentUserId);
				}
			}

			if (response) {
				if (response.status == 200) {
					const data = await response.json();
					setSurgeryList(data);
					divideListIntoPages(data);
					setEmpty(false);
				}
				if (response.status == 404) {
					setEmpty(true);
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

	useEffect(() => {
		changePageTitle('Zabiegi');
		loadSurgeryList();

		const state = location.state as { newId: string; deleted: boolean };
		if (state != null) {
			setMessage(() => ({
				id: state.newId,
				message: state.deleted ? 'Usunięto zabieg: ' : 'Nowy zabieg: ',
			}));
		}
	}, []);

	const changePage = (e) => {
		e.preventDefault();
		const { name, value } = e.target;
		setSelectedPage(value);
	};

	const handleSearch = async (paramters: SearchListParamter) => {
		try {
			const response = await surgeryApiCalls.searchSurgeryList(paramters);
			if (response) {
				if (response.status == 200) {
					setEmpty(false);
					const data = await response.json();
					setSurgeryList(data);
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
			console.log(error);
			setServerError(true);
		}
	};

	return (
		<div>
			<UpperPageStripe
				bredCrumbs={
					<BreadCrumbComponent
						elements={[{ label: 'Zabiegi', active: true, link: '' }]}
					/>
				}
			>
				<VisitSearch onSearch={handleSearch} />
			</UpperPageStripe>
			<div className="container">
				<ServerErrorInfoComponenet serverError={serverError} />

				<div className="row">
					<RegiserSuccessInfo newId={message.id} message={message.message} />
				</div>

				<div className="card card-body shadow ">
					<CardTitleCompnenet label="Zarejestrowane zabiegi" />
					<TableOrEmpty Empty={empty}>
						<SurgeryTable
							pagedList={pagedList}
							selectedPage={selectedPage}
							setMessage={setMessage}
							message={message}
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

export default SurgeryList;
