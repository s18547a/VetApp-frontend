export class ClinicInfoApiCalls {
	baseUrl: string;
	constructor() {
		this.baseUrl = 'http://localhost:8000/clinicInfo';
	}

	getClinicSchedulde = async () => {
		const url = `${this.baseUrl}/schedulde`;
		const promise = await fetch(url);

		return promise;
	};
}
