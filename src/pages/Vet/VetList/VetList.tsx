import { ReactElement, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { VetApiCalls } from '../../../apiCalls/vetApiCalls';
import Vet from '../../../classes/Vet';
import TableOrEmpty from '../../../components/List/TableOrEmpty';
import BreadCrumbComponent from '../../../components/Navigation/BreadCrumbComponent';
import ServerErrorInfoComponenet from '../../../components/InfoBanners/ServerErrorInfoBannerComponent';
import { spaceContact } from '../../../utils/contactHelper';
import { changePageTitle } from '../../../utils/otherHelper';
import CardTitleCompnenet from '../../../components/General/CardTitle';
import UpperPageStripe from '../../../components/General/UpperPageStripe';
import { getCurrentUser } from '../../../utils/authHelper';
import RegisterSuccessBannerComponent from '../../../components/InfoBanners/RegisterSuccessBannerComponent';
import VetTable from './Components/VetTable';

function VetList(): ReactElement {
	const vetApiCalls = new VetApiCalls();
	const [vetList, setVetList] = useState<Vet[]>([]);
	const [empty, setEmpty] = useState<boolean>(false);
	const [serverError, setServerError] = useState(false);

	const location = useLocation();
	useEffect(() => {
		changePageTitle('Weterynarze');

		const loadVetList = async () => {
			try {
				const response = await vetApiCalls.getVets();
				if (response) {
					if (response.status == 200) {
						const filteredList = (await response.json()).filter((vet) => {
							return vet.VetId != getCurrentUser().userId;
						});
						setVetList(filteredList);
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
				console.log(true);
			}
		};
		loadVetList();

		const state = location.state as { newId: string };
		if (state != null) {
			setNewId(state.newId);
		}
	}, []);

	const [VetId, setNewId] = useState<string>('');
	return (
		<div className="">
			<UpperPageStripe
				bredCrumbs={
					<BreadCrumbComponent
						elements={[{ label: 'Weterynarze', active: true, link: '' }]}
					/>
				}
			>
				{}
			</UpperPageStripe>
			<div className="container">
				<ServerErrorInfoComponenet serverError={serverError} />
				<RegisterSuccessBannerComponent
					newId={VetId}
					message={'Nowy weterynarz: '}
				/>

				<div className="card card-body shadow">
					<CardTitleCompnenet label="Zatrudnieni weterynarze" />
					<TableOrEmpty Empty={empty}>
						<VetTable vetList={vetList} VetId={VetId} />
					</TableOrEmpty>
				</div>
			</div>
		</div>
	);
}

export default VetList;
