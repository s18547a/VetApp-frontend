import Vet from '../classes/Vet';
import {
	createHTTPDeleteOptions,
	createHttpGetOptions,
	createHTTPPostOptions,
	createHTTPutOptions,
} from '../utils/apiCallsHelper';
import { isAuthenticated } from '../utils/authHelper';
import { getCurrentDate } from '../utils/getCurrentDate';
import { responseAuthenticationHandler } from '../utils/reponseAuthorizationHandler';
import { isVet } from '../utils/userType';
import { SearchListParamter } from '../utils/VisitListParameters';
import { domain } from './config/domain';

export class SurgeryApiCalls {
	baseUrl: string;
	constructor() {
		this.baseUrl = `https://${domain}/surgeries`;
	}

	getSurgery = async (surgeryId: string | undefined) => {
		const url = `${this.baseUrl}/${surgeryId}`;
		const options = createHttpGetOptions(isAuthenticated());
		const promise = await fetch(url, options);
		responseAuthenticationHandler(promise);
		return promise;
	};

	getSurgeries = async () => {
		const options = createHttpGetOptions(isVet());
		const promise = await fetch(this.baseUrl, options);
		responseAuthenticationHandler(promise);
		return promise;
	};

	getSurgeriesByOwner = async (OwnerId: string) => {
		const ulr = `${this.baseUrl}?OwnerId=${OwnerId}`;
		const options = createHttpGetOptions(isAuthenticated());
		const promise = await fetch(ulr, options);
		responseAuthenticationHandler(promise);
		return promise;
	};

	getSurgeriesByVet = async (VetId: string) => {
		const ulr = `${this.baseUrl}?VetId=${VetId}`;
		const options = createHttpGetOptions(isAuthenticated());
		const promise = await fetch(ulr, options);
		responseAuthenticationHandler(promise);
		return promise;
	};

	searchSurgeryList = async (paramters: SearchListParamter) => {
		const queryURL = paramters.createURLString();
		console.log(queryURL);
		const url = `${this.baseUrl}/search${paramters.createURLString()}`;
		const options = createHttpGetOptions(isAuthenticated());
		const promise = await fetch(url, options);
		responseAuthenticationHandler(promise);
		return promise;
	};

	getTodaySurgeries = async (VetId: string) => {
		const url = `${this.baseUrl}?VetId=${VetId}&Date=${getCurrentDate()}`;
		const options = createHttpGetOptions(isVet());
		const promise = await fetch(url, options);
		responseAuthenticationHandler(promise);
		return promise;
	};

	getSurgeryTypes = async () => {
		const url = `${this.baseUrl}/types`;
		const options = createHttpGetOptions(isVet());
		const promise = await fetch(url, options);
		responseAuthenticationHandler(promise);
		return promise;
	};

	registerSurgery = async (surgery) => {
		const surgeryString = JSON.stringify(surgery);

		const options = createHTTPPostOptions(isVet(), surgeryString);

		const promise = await fetch(this.baseUrl, options);
		responseAuthenticationHandler(promise);
		return promise;
	};

	updateSurgeryReport = async (
		surgeryReport,
		ReportSurgeryId: string | undefined
	) => {
		const url = `${this.baseUrl}/${ReportSurgeryId}/report`;

		const surgeryReportBodyString = JSON.stringify({
			SurgeryId: ReportSurgeryId,
			Report: surgeryReport,
		});

		const options = createHTTPutOptions(isVet(), surgeryReportBodyString);

		const promise = await fetch(url, options);
		responseAuthenticationHandler(promise);
		return promise;
	};

	cancelSurgery = async (SurgeryId: string | undefined) => {
		const url = `${this.baseUrl}/${SurgeryId}`;
		const options = createHTTPDeleteOptions(isVet());

		const promise = await fetch(url, options);
		responseAuthenticationHandler(promise);
		return promise;
	};
}
