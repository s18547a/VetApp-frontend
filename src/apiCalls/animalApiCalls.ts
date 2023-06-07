import AnimalMedicalInfo from '../classes/AnimalMedicalInfo';
import {
	createHttpGetOptions,
	createHTTPPostOptions,
	createHTTPutOptions,
} from '../utils/apiCallsHelper';
import { getCurrentUser, isAuthenticated } from '../utils/authHelper';
import { responseAuthenticationHandler } from '../utils/reponseAuthorizationHandler';
import { isManager, isVet } from '../utils/userType';
import { domain } from './config/domain';

export class AnimalApiCalls {
	baseUrl: string;
	illnessesUrl: string;
	animalMedInfoURL: string;
	constructor() {
		this.baseUrl = `http://${domain}/animals`;
		this.illnessesUrl = `${this.baseUrl}/illnesses`;
		this.animalMedInfoURL = `${this.baseUrl}/medicalInfo`;
	}

	getAnimalTypes = async () => {
		const url = `${this.baseUrl}/types`;
		const options = createHttpGetOptions(isAuthenticated());
		const promise = await fetch(url, options);

		responseAuthenticationHandler(promise);

		return promise;
	};

	getAnimalSpecies = async () => {
		const url = `${this.baseUrl}/species`;
		const options = createHttpGetOptions(isManager());
		const promise = await fetch(url, options);
		responseAuthenticationHandler(promise);
		return promise;
	};

	getAnimals = async () => {
		const url = this.baseUrl;
		const options = createHttpGetOptions(isVet());
		const promise = await fetch(url, options);
		responseAuthenticationHandler(promise);
		return promise;
	};

	registerAnimal = async (Animal) => {
		const url = this.baseUrl;
		const animal = JSON.stringify(Animal);

		let token = null;
		if (isAuthenticated()) {
			token = getCurrentUser().token;
		}
		const options = createHTTPPostOptions(isAuthenticated(), animal);

		const promise = await fetch(url, options);
		responseAuthenticationHandler(promise);
		return promise;
	};

	getAnimalsbyOwner = async (OwnerId) => {
		const url = `${this.baseUrl}?OwnerId=${OwnerId}`;

		const options = createHttpGetOptions(isAuthenticated());

		const promise = await fetch(url, options);
		responseAuthenticationHandler(promise);
		return promise;
	};

	getAnimalById = async (AnimalId: string) => {
		const url = `${this.baseUrl}/${AnimalId}`;
		const options = createHttpGetOptions(isAuthenticated());
		const promise = await fetch(url, options);
		responseAuthenticationHandler(promise);
		return promise;
	};
	getAnimalsByOwnerEmail = async (Email: string) => {
		const url = `${this.baseUrl}?Email=${Email}`;

		const options = createHttpGetOptions(isAuthenticated());
		const promise = await fetch(url, options);
		responseAuthenticationHandler(promise);
		return promise;
	};

	updateAnimal = async (Animal) => {
		const url = this.baseUrl;
		const stringifyAnimal = JSON.stringify(Animal);

		const options = createHTTPutOptions(isAuthenticated(), stringifyAnimal);

		const promise = await fetch(url, options);
		responseAuthenticationHandler(promise);
		return promise;
	};

	getAnimalIllnesses = async (AnimalId) => {
		const url = `${this.baseUrl}/${AnimalId}/illnesses`;
		const options = createHttpGetOptions(isAuthenticated());
		const promise = await fetch(url, options);
		responseAuthenticationHandler(promise);
		return promise;
	};

	setRecoveryIllness = async (Illness) => {
		const stringIllness = JSON.stringify(Illness);
		const options = createHTTPutOptions(isVet(), stringIllness);

		const promise = await fetch(this.illnessesUrl, options);
		responseAuthenticationHandler(promise);
		return promise;
	};

	getAnimalMedicalInfo = async (AnimalId: string) => {
		const url = `${this.baseUrl}/${AnimalId}/medicalInfo`;

		const options = createHttpGetOptions(isAuthenticated());
		const promise = await fetch(url, options);
		responseAuthenticationHandler(promise);
		return promise;
	};

	updateMedicalInfo = async (AnimalMedicalInfo: AnimalMedicalInfo) => {
		const stringifyAMI = JSON.stringify(AnimalMedicalInfo);

		const options = createHTTPutOptions(isVet(), stringifyAMI);
		const promise = await fetch(this.animalMedInfoURL, options);
		responseAuthenticationHandler(promise);
		return promise;
	};
}
