import { createHttpGetOptions } from '../utils/apiCallsHelper';
import { isAuthenticated } from '../utils/authHelper';
import { responseAuthenticationHandler } from '../utils/reponseAuthorizationHandler';
import { isVet } from '../utils/userType';
import { domain } from './config/domain';
export class OwnerApiCalls {
	baseUrl: string;
	constructor() {
		this.baseUrl = `https://${domain}/owners`;
	}

	getOwnerById = async (OwnerId: string) => {
		const ownerUrl = `${this.baseUrl}/${OwnerId}`;
		const options = createHttpGetOptions(isAuthenticated());
		const promise = await fetch(ownerUrl, options);
		responseAuthenticationHandler(promise);
		return promise;
	};

	getOwners = async () => {
		const options = createHttpGetOptions(isVet());
		const promise = fetch(this.baseUrl, options);
		responseAuthenticationHandler(promise);
		return promise;
	};

	registerOwnerApiCall = async (Owner) => {
		const owner = JSON.stringify(Owner);
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: owner,
		};
		const promise = fetch(this.baseUrl, options);
		return promise;
	};
}
