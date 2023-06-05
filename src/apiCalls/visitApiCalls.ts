import {
	createHTTPDeleteOptions,
	createHttpGetOptions,
	createHTTPPostOptions,
} from '../utils/apiCallsHelper';
import { isAuthenticated } from '../utils/authHelper';
import { isManager, isVet } from '../utils/userType';
import { SearchListParamter } from '../utils/VisitListParameters';

export class VisitApiCalls {
	baseURL: string;
	activities: string;
	constructor() {
		this.baseURL = 'http://localhost:8000/visits';
		this.activities = 'http://localhost:8000/visits/activities';
	}

	getVisitList = async () => {
		const options = createHttpGetOptions(isVet());
		const promise = await fetch(this.baseURL, options);

		return promise;
	};

	getVisitListByOwner = async (OwnerId: string) => {
		const url = `${this.baseURL}?OwnerId=${OwnerId}`;
		const options = createHttpGetOptions(isAuthenticated());
		const promise = await fetch(url, options);
		return promise;
	};

	getVisitById = async (VisitId) => {
		const url = `${this.baseURL}/${VisitId}`;
		const options = createHttpGetOptions(isAuthenticated());
		const promise = await fetch(url, options);

		return promise;
	};

	searchVisitList = async (paramters: SearchListParamter) => {
		const queryURL = paramters.createURLString();
		console.log(queryURL);
		const url = `${this.baseURL}/search${paramters.createURLString()}`;
		const options = createHttpGetOptions(isAuthenticated());
		const promise = await fetch(url, options);

		return promise;
	};

	registerVisit = async (Visit) => {
		const stringVisit = JSON.stringify(Visit);

		const options = createHTTPPostOptions(isVet(), stringVisit);
		console.log('SENDED');
		const promise = await fetch(this.baseURL, options);

		return promise;
	};

	getMedicalAtivities = async () => {
		const options = createHttpGetOptions(isVet());

		const promise = await fetch(this.activities, options);

		return promise;
	};

	addMedicalActivity = async (medicalActivity) => {
		const options = createHTTPPostOptions(
			isManager(),
			JSON.stringify(medicalActivity)
		);

		const promise = await fetch(this.activities, options);
		return promise;
	};

	deleteMedicalActivity = async (medicalActivityId: string) => {
		const url = `http://localhost:8000/visits/activities/${medicalActivityId}`;
		const options = createHTTPDeleteOptions(isManager());
		const promise = await fetch(url, options);
		return promise;
	};
}
