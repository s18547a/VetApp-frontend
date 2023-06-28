import {
	createHttpGetOptions,
	createHTTPPostOptions,
	createHTTPutOptions,
} from '../utils/apiCallsHelper';
import { isAuthenticated } from '../utils/authHelper';
import { responseAuthenticationHandler } from '../utils/reponseAuthorizationHandler';
import { isManager, isVet } from '../utils/userType';
import { domain } from './config/domain';
export class VetApiCalls {
	baseUrl: string;
	baseUrlSchedulde;
	constructor() {
		this.baseUrl = `https://${domain}/vets`;
		this.baseUrlSchedulde = `https://${domain}/vets/schedulde`;
	}

	getVets = async () => {
		const options = createHttpGetOptions(isVet());
		const promise = await fetch(this.baseUrl, options);

		return promise;
	};

	getVetByVetId = async (VetId: string) => {
		const url = `${this.baseUrl}/${VetId}`;
		const options = createHttpGetOptions(isVet());
		const promise = await fetch(url, options);

		return promise;
	};

	getVetBySurgeryType = async (SurgeryType: string) => {
		const url = `${this.baseUrl}?VetType=${SurgeryType}`;
		const options = createHttpGetOptions(isVet());
		const promise = await fetch(url, options);

		return promise;
	};

	getVetTypes = async () => {
		const url = `${this.baseUrl}/types`;
		const options = createHttpGetOptions(isManager());
		const promise = await fetch(url, options);

		return promise;
	};

	registerVet = async (Vet) => {
		const vet = JSON.stringify(Vet);

		const options = createHTTPPostOptions(isManager(), vet);
		const promise = await fetch(this.baseUrl, options);

		return promise;
	};
	updateVet = async (Vet) => {
		const vet = JSON.stringify(Vet);

		const options = createHTTPutOptions(isManager(), vet);
		const promise = await fetch(this.baseUrl, options);

		return promise;
	};

	getVetsOnDay = async (Day: string) => {
		const url = `https://${domain}/vets?Date=${Day}`;
		const options = createHttpGetOptions(isAuthenticated());
		const promise = await fetch(url, options);
		responseAuthenticationHandler(promise);
		return promise;
	};

	getValiableHours = async (Day, VetId) => {
		const options = createHttpGetOptions(isAuthenticated());
		const url = `${this.baseUrlSchedulde}/availableHours?Date=${Day}&VetId=${VetId}&isSurgery=false`;

		const promise = await fetch(url, options);
		responseAuthenticationHandler(promise);
		return promise;
	};
	getValiableHourForSurgery = async (Day, VetId) => {
		const url = `${this.baseUrlSchedulde}/availableHours?Date=${Day}&VetId=${VetId}&isSurgery=true`;
		const options = createHttpGetOptions(isVet());
		const promise = await fetch(url, options);
		responseAuthenticationHandler(promise);
		return promise;
	};

	getVetSchedulde = async (VetId) => {
		const url = `${this.baseUrl}/${VetId}/schedulde`;
		const options = createHttpGetOptions(isVet());
		const promise = await fetch(url, options);
		responseAuthenticationHandler(promise);
		return promise;
	};

	getVetDaysOfWeek = async (VetId) => {
		const url = `${this.baseUrl}/${VetId}/daysOfWeek`;
		const options = createHttpGetOptions(isAuthenticated());
		const promise = await fetch(url, options);
		responseAuthenticationHandler(promise);
		return promise;
	};

	updateSchedulde = async (updatedSchedulde) => {
		const scheduldeStr = JSON.stringify(updatedSchedulde);
		const optios = createHTTPutOptions(isManager(), scheduldeStr);

		const promise = await fetch(this.baseUrlSchedulde, optios);
		responseAuthenticationHandler(promise);
		return promise;
	};

	getFullSchedulde = async () => {
		const url = `${this.baseUrlSchedulde}/full`;
		const options = createHttpGetOptions(isManager());
		const promise = await fetch(url, options);
		responseAuthenticationHandler(promise);
		return promise;
	};

	getTodaySchedulde = async (date: string, vetId: string) => {
		const url = `https://${domain}/vets/todaySchedulde?Date=${date}&VetId=${vetId}`;
		const options = createHttpGetOptions(isVet());
		const promise = await fetch(url, options);
		responseAuthenticationHandler(promise);
		return promise;
	};
}
