import { ReactElement, useEffect, useState } from 'react';
import { VisitApiCalls } from '../../../apiCalls/visitApiCalls';
import MedicalActivity from '../../../classes/MedicalActivity';
import CardTitleCompnenet from '../../../components/General/CardTitle';
import UpperPageStripe from '../../../components/General/UpperPageStripe';
import ServerErrorInfoBannerComponenet from '../../../components/InfoBanners/ServerErrorInfoBannerComponent';
import Modal from '../../../components/Modal/Modal';
import ModalEnableCancelBtn from '../../../components/Modal/ModalEnableCancelBtn';
import BreadCrumbComponent from '../../../components/Navigation/BreadCrumbComponent';
import ActivityForm from './ActivityForm';
import { changePageTitle } from '../../../utils/otherHelper';

import ActivitiesTable from './ActivitiesTable';

function ActivitiesList(): ReactElement {
	const [medicalActivityList, setMedicalActivityList] = useState<
		MedicalActivity[]
	>([]);
	changePageTitle('Aktywności');
	const visitApiCalls = new VisitApiCalls();
	const [serverError, setServerError] = useState(false);

	const [edited, setEdited] = useState('');

	const getMedicalAtivitiesFromApi = async () => {
		const response = await visitApiCalls.getMedicalAtivities();
		try {
			if (response.status == 200) {
				setMedicalActivityList(await response.json());
			} else setServerError(true);
		} catch (error) {
			setServerError(true);
		}
	};
	useEffect(() => {
		getMedicalAtivitiesFromApi();
	}, []);

	useEffect(() => {
		getMedicalAtivitiesFromApi();
	}, [edited]);

	const [deletedId, setDeletedId] = useState('');

	const deleteActivity = async (): Promise<void> => {
		try {
			const response = await visitApiCalls.deleteMedicalActivity(deletedId);

			if (response.status == 201) {
				setEdited('T');
			} else {
				setServerError(true);
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="" style={{ width: '100%', height: '100%' }}>
			<UpperPageStripe
				bredCrumbs={
					<BreadCrumbComponent
						elements={[
							{ label: 'Różne', active: true, link: '' },
							{ label: 'Czynności', active: true, link: '' },
						]}
					/>
				}
				children={undefined}
			/>
			<div className="container">
				<Modal id="act" label="Na pewno?" function={deleteActivity} />
				<ServerErrorInfoBannerComponenet serverError={serverError} />

				<div className="row justify-content-center">
					<div className="col-lg-4">
						<div className=" card card-body shadow ">
							<CardTitleCompnenet label="Czynność medyczne" />
							<ActivitiesTable
								medicalActivityList={medicalActivityList}
								setDeletedId={setDeletedId}
							/>
						</div>
					</div>

					<div className="col-lg-4 ">
						<ActivityForm
							setServerError={setServerError}
							setEdited={setEdited}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ActivitiesList;
