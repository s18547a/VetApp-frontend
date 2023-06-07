import { useEffect, useState } from 'react';
import { VaccineApiCalls } from '../../../apiCalls/vaccineApiCalls';
import VaccineType from '../../../classes/VaccineType';
import CardTitleCompnenet from '../../../components/General/CardTitle';
import UpperPageStripe from '../../../components/General/UpperPageStripe';
import ServerErrorInfoBannerComponenet from '../../../components/InfoBanners/ServerErrorInfoBannerComponent';
import BreadCrumbComponent from '../../../components/Navigation/BreadCrumbComponent';
import VaccineForm from './VaccineForm';
import { changePageTitle } from '../../../utils/otherHelper';
import VaccineTable from './VaccineTable';
import Modal from '../../../components/Modal/Modal';

function VaccineList() {
	const vaccineApiCalls = new VaccineApiCalls();
	const [serverError, setServerError] = useState(false);
	const [vaccineList, setVaccineList] = useState<VaccineType[]>([]);
	const [deletedVaccine, setDeletedVaccine] = useState('');

	changePageTitle('Szczepienia');
	const getVaccinesFromApi = async () => {
		try {
			const response = await vaccineApiCalls.getVaccines();
			if (response) {
				if (response.status == 200) {
					setVaccineList(await response.json());
				} else setServerError(true);
			}
		} catch (error) {
			console.log(error);
			setServerError(true);
		}
	};
	useEffect(() => {
		getVaccinesFromApi();
	}, []);

	const [edited, setEdited] = useState('');

	useEffect(() => {
		getVaccinesFromApi();
	}, [edited]);

	const deleteVaccine = async () => {
		try {
			const response = await vaccineApiCalls.deleteVaccine(deletedVaccine);
			if (response) {
				if (response.status == 201) {
					setEdited('T');
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
		<div className="" style={{ width: '100%', height: '100%' }}>
			<UpperPageStripe
				bredCrumbs={
					<BreadCrumbComponent
						elements={[
							{ label: 'Różne', active: true, link: '' },
							{ label: 'Szczepionki', active: true, link: '' },
						]}
					/>
				}
				children={undefined}
			/>
			<div className=" container">
				<Modal id="vac" label="Na pewno?" function={deleteVaccine} />
				<ServerErrorInfoBannerComponenet serverError={serverError} />
				<div className="row justify-content-center">
					<div className="col-lg-4">
						<div className="card card-body shadow">
							<CardTitleCompnenet label="Szczepionki" />
							<VaccineTable
								vaccineList={vaccineList}
								setDeletedVaccine={setDeletedVaccine}
							/>
						</div>
					</div>
					<div className="col-lg-4 ">
						<VaccineForm
							setServerError={setServerError}
							setEdited={setEdited}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default VaccineList;
