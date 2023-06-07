import {
	createHTTPDeleteOptions,
	createHttpGetOptions,
	createHTTPPostOptions,
} from '../utils/apiCallsHelper';
import { isAuthenticated } from '../utils/authHelper';
import { responseAuthenticationHandler } from '../utils/reponseAuthorizationHandler';
import { isManager, isVet } from '../utils/userType';
import { SearchListParamter } from '../utils/VisitListParameters';
import { domain } from './config/domain';

export class VisitApiCalls {
	baseURL: string;
	activities: string;
	constructor() {
		this.baseURL = `http://${domain}/visits`;
		this.activities = `http://${domain}/visits/activities`;
	}

	getVisitList = async () => {
		const options = createHttpGetOptions(isVet());
		const promise = await fetch(this.baseURL, options);
		responseAuthenticationHandler(promise);
		return promise;
	};

	getVisitListByOwner = async (OwnerId: string) => {
		const url = `${this.baseURL}?OwnerId=${OwnerId}`;
		const options = createHttpGetOptions(isAuthenticated());
		const promise = await fetch(url, options);
		responseAuthenticationHandler(promise);
		return promise;
	};

	getVisitById = async (VisitId) => {
		const url = `${this.baseURL}/${VisitId}`;
		const options = createHttpGetOptions(isAuthenticated());
		const promise = await fetch(url, options);
		responseAuthenticationHandler(promise);
		return promise;
	};

	searchVisitList = async (paramters: SearchListParamter) => {
		const queryURL = paramters.createURLString();

		const url = `${this.baseURL}/search${paramters.createURLString()}`;
		const options = createHttpGetOptions(isAuthenticated());
		const promise = await fetch(url, options);
		responseAuthenticationHandler(promise);
		return promise;
	};

	registerVisit = async (Visit) => {
		const stringVisit = JSON.stringify(Visit);

		const options = createHTTPPostOptions(isVet(), stringVisit);

		const promise = await fetch(this.baseURL, options);
		responseAuthenticationHandler(promise);
		return promise;
	};

	getMedicalAtivities = async () => {
		const options = createHttpGetOptions(isVet());

		const promise = await fetch(this.activities, options);
		responseAuthenticationHandler(promise);
		return promise;
	};

	addMedicalActivity = async (medicalActivity) => {
		const options = createHTTPPostOptions(
			isManager(),
			JSON.stringify(medicalActivity)
		);

		const promise = await fetch(this.activities, options);
		responseAuthenticationHandler(promise);
		return promise;
	};

	deleteMedicalActivity = async (medicalActivityId: string) => {
		const url = `http://${domain}/visits/activities/${medicalActivityId}`;
		const options = createHTTPDeleteOptions(isManager());
		const promise = await fetch(url, options);
		responseAuthenticationHandler(promise);
		return promise;
	};
}
