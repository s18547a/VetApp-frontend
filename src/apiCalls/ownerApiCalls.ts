import { createHttpGetOptions } from '../utils/apiCallsHelper';
import { isAuthenticated } from '../utils/authHelper';
import { isVet } from '../utils/userType';
export class OwnerApiCalls {
	baseUrl: string;
	constructor() {
		this.baseUrl = 'http://localhost:8000/owners';
	}

	getOwnerById = async (OwnerId: string) => {
		const ownerUrl = `${this.baseUrl}/${OwnerId}`;
		const options = createHttpGetOptions(isAuthenticated());
		const promise = await fetch(ownerUrl, options);

		return promise;
	};

	getOwners = async () => {
		const options = createHttpGetOptions(isVet());
		const promise = fetch(this.baseUrl, options);

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
