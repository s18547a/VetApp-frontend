import { domain } from './config/domain';

export class UserApiCalls {
	baseUrl: string;
	constructor() {
		this.baseUrl = `http://${domain}/users`;
	}

	login = async (user) => {
		const url = `${this.baseUrl}`;
		const userJSON = JSON.stringify(user); //convert javascript to JSON
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: userJSON,
		};
		const promise = fetch(url, options);
		return promise;
	};
}
