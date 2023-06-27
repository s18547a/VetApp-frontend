import { responseAuthenticationHandler } from '../utils/reponseAuthorizationHandler';
import { domain } from './config/domain';

export class ClinicInfoApiCalls {
	baseUrl: string;
	constructor() {
		this.baseUrl = `https://${domain}/clinicInfo`;
	}

	getClinicSchedulde = async () => {
		const url = `${this.baseUrl}/schedulde`;
		const promise = await fetch(url);
		responseAuthenticationHandler(promise);
		return promise;
	};
}
