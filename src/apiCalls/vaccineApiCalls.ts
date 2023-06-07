import VaccineType from '../classes/VaccineType';
import {
	createHTTPDeleteOptions,
	createHttpGetOptions,
	createHTTPPostOptions,
} from '../utils/apiCallsHelper';
import { isAuthenticated } from '../utils/authHelper';
import { responseAuthenticationHandler } from '../utils/reponseAuthorizationHandler';
import { isManager } from '../utils/userType';
import { domain } from './config/domain';

export class VaccineApiCalls {
	baseUrl: string;
	constructor() {
		this.baseUrl = `http://${domain}/vaccines`;
	}

	getVaccines = async () => {
		const options = createHttpGetOptions(isManager());
		const promise = await fetch(this.baseUrl, options);
		responseAuthenticationHandler(promise);
		return promise;
	};

	getAnimalVaccines = async (AnimalId: string | undefined) => {
		const url = `${this.baseUrl}/${AnimalId}`;
		const options = createHttpGetOptions(isAuthenticated());
		const promise = await fetch(url, options);
		responseAuthenticationHandler(promise);
		return promise;
	};

	getAnimalCoreVaccines = async (AnimalId: string | undefined) => {
		const url = `${this.baseUrl}/core/${AnimalId}`;
		const options = createHttpGetOptions(isAuthenticated());
		const promise = await fetch(url, options);
		responseAuthenticationHandler(promise);
		return promise;
	};

	getAnimalUnadminstratedVaccines = async (AnimalId: string | undefined) => {
		console.log(AnimalId);
		const url = `${this.baseUrl}/types?unAdministratedAnimalId=${AnimalId}`;
		const options = createHttpGetOptions(isAuthenticated());
		const promise = await fetch(url, options);
		responseAuthenticationHandler(promise);
		return promise;
	};

	registerVaccine = async (vaccineType: VaccineType) => {
		const options = createHTTPPostOptions(
			isManager(),
			JSON.stringify(vaccineType)
		);

		const promise = await fetch(this.baseUrl, options);
		responseAuthenticationHandler(promise);
		return promise;
	};

	deleteVaccine = async (vaccineType: string) => {
		const options = createHTTPDeleteOptions(isManager());
		const url = `${this.baseUrl}/${vaccineType}`;
		const promise = await fetch(url, options);
		responseAuthenticationHandler(promise);
		return promise;
	};
}
