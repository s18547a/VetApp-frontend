import { ReactElement, useEffect, useState } from 'react';
import { ClinicInfoApiCalls } from '../../../apiCalls/clinicInfoApiCalls';
import ServerErrorInfoBannerComponenet from '../../../components/InfoBanners/ServerErrorInfoBannerComponent';

import ScheduldeRow from './ScheduldeRow';

function InfoPage(): ReactElement {
	const [schedulde, setSchedulde] = useState<{
		Monday: string | undefined;
		Tuesday: string | undefined;
		Wednesday: string | undefined;
		Thursday: string | undefined;
		Friday: string | undefined;
		Saturday: string | undefined;
		Sunday: string | undefined;
	}>({
		Monday: undefined,
		Tuesday: undefined,
		Wednesday: undefined,
		Thursday: undefined,
		Friday: undefined,
		Saturday: undefined,
		Sunday: undefined,
	});
	const clinicInfoApiCalls = new ClinicInfoApiCalls();

	const [serverError, setServerError] = useState(false);
	useEffect(() => {
		const loadClinicSchedulde = async () => {
			try {
				const response = await clinicInfoApiCalls.getClinicSchedulde();
				if (response) {
					if (response.status == 200) {
						setSchedulde(await response.json());
					} else {
						setServerError(true);
					}
				}
			} catch (error) {
				console.log(error);
				setServerError(true);
			}
		};
		loadClinicSchedulde();
	}, []);

	return (
		<div className="container ">
			<ServerErrorInfoBannerComponenet serverError={serverError} />
			<div className="row justify-content-center">
				<div className="col-lg-6">
					<div className="card card-body  border-0 shadow">
						<ScheduldeRow label="Poniedziałek" day={schedulde.Monday} />
						<ScheduldeRow label="Wtorek" day={schedulde.Tuesday} />
						<ScheduldeRow label="Środa" day={schedulde.Wednesday} />
						<ScheduldeRow label="Czwartek" day={schedulde.Thursday} />
						<ScheduldeRow label="Piątek" day={schedulde.Friday} />
						<ScheduldeRow label="Sobota" day={schedulde.Saturday} />
						<ScheduldeRow label="Niedziela" day={schedulde.Sunday} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default InfoPage;
