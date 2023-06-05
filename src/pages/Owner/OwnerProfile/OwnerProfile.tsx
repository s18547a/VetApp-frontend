import { ReactElement, useEffect, useState } from 'react';
import { OwnerApiCalls } from '../../../apiCalls/ownerApiCalls';
import Owner from '../../../classes/Owner';
import { getCurrentUser } from '../../../utils/authHelper';
import ProfileDiv from '../../../components/Profile/ProfileDiv';

import UpperPageStripe from '../../../components/General/UpperPageStripe';
import BreadCrumbComponent from '../../../components/Navigation/BreadCrumbComponent';
import ServerErrorInfoComponenet from '../../../components/InfoBanners/ServerErrorInfoBannerComponent';
function OwnerProfile(): ReactElement {
	const [owner, setOwner] = useState<Owner>();

	const [serverError, setServerError] = useState(false);

	const ownerApiCalls = new OwnerApiCalls();
	const getOwnerFromApi = async (): Promise<void> => {
		const user = getCurrentUser();
		try {
			const response = await ownerApiCalls.getOwnerById(user.userTypeId);

			if (response.status == 200) {
				setOwner(await response.json());
			}
			if (response.status == 500) {
				setServerError(true);
			}
		} catch (error) {
			setServerError(true);
		}
	};

	useEffect(() => {
		getOwnerFromApi();
	}, []);

	return (
		<div>
			<UpperPageStripe
				bredCrumbs={
					<BreadCrumbComponent
						elements={[{ label: 'Profil', active: true, link: '' }]}
					/>
				}
			>
				{}
			</UpperPageStripe>
			<ServerErrorInfoComponenet serverError={serverError} />
			<div className="container">
				<div className="row  mt-5 justify-content-center">
					<div className="col-4">
						<div className="container card card-body shadow">
							<div className="card-title">
								<h5>Profil</h5>
							</div>
							<div className="row just">
								<div className="col-12">
									<ProfileDiv label={'Imie'} value={owner?.Name} />
								</div>
							</div>

							<div className="row">
								<div className="col-12">
									<ProfileDiv label={'Nazwisko'} value={owner?.LastName} />
								</div>
							</div>
							<div className="row">
								<div className="col-12">
									<ProfileDiv label={'Email'} value={owner?.Email} />
								</div>
							</div>

							<div className="row">
								<div className="col-12">
									<ProfileDiv label={'Kontakt'} value={owner?.Contact} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default OwnerProfile;
