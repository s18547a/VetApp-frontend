import { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { VisitApiCalls } from '../../../apiCalls/visitApiCalls';
import Visit from '../../../classes/Visit';
import BreadCrumbComponent from '../../../components/Navigation/BreadCrumbComponent';
import ProfileDiv from '../../../components/Profile/ProfileDiv';
import ServerErrorInfoComponenet from '../../../components/InfoBanners/ServerErrorInfoBannerComponent';
import CardTitleCompnenet from '../../../components/General/CardTitle';
import UpperPageStripe from '../../../components/General/UpperPageStripe';

function VisitProfile(): ReactElement {
	const [visit, setVist] = useState<Visit>();
	const [serverError, setServerError] = useState<boolean>(false);
	const visitApiCalls = new VisitApiCalls();
	const param = useParams();

	useEffect(() => {
		const VisitId = param.VisitId;

		const loadVisit = async () => {
			try {
				const response = await visitApiCalls.getVisitById(VisitId);
				if (response) {
					if (response.status == 200) {
						setVist(await response.json());
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

		loadVisit();
	}, []);

	return (
		<div>
			<UpperPageStripe
				bredCrumbs={
					<BreadCrumbComponent
						elements={[
							{ label: 'Wizyty', active: false, link: '/visits' },
							{
								label: 'Informacje',
								active: true,
								link: '',
							},
						]}
					/>
				}
			>
				{}
			</UpperPageStripe>
			<div className="container ">
				<ServerErrorInfoComponenet serverError={serverError} />

				<div className="row justify-content-center">
					<div className="col-lg-4 col-8">
						<div className="card card-body shadow ">
							<CardTitleCompnenet label="Informacje podstawowe" />
							<div className="row justify-content-center">
								<ProfileDiv value={visit?.VisitDate} label="Data" />

								<ProfileDiv value={visit?.Hour} label="Godzina" />

								<ProfileDiv value={visit?.Animal.Name} label="Pacjent" />

								<ProfileDiv
									value={`${visit?.Vet.Name} ${visit?.Vet.LastName}`}
									label="Weterynarz"
								/>

								<ProfileDiv value={visit?.Bill} label="Rachunek" />
								<div className="row mt-2 ">
									<CardTitleCompnenet label="Opis" />
									<p>{visit?.Note}</p>
								</div>
							</div>
						</div>
					</div>

					<div className="col-3">
						<div className="card card-body shadow ">
							<CardTitleCompnenet label="Czynności" />
							<ul className="list-group list-group-flush">
								{visit?.MedicalActivities.map((activity) => {
									return (
										<li className="list-group-item">
											{' '}
											{activity.ActivityName}
										</li>
									);
								})}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default VisitProfile;
