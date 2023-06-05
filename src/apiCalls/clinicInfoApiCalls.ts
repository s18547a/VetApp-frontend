import { domain } from './config/domain';

export class ClinicInfoApiCalls {
	baseUrl: string;
	constructor() {
		this.baseUrl = `http://${domain}/clinicInfo`;
	}

	getClinicSchedulde = async () => {
		const url = `${this.baseUrl}/schedulde`;
		const promise = await fetch(url);

		return promise;
	};
}
