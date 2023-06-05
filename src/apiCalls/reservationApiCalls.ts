import {
	createHTTPDeleteOptions,
	createHttpGetOptions,
	createHTTPPostOptions,
} from '../utils/apiCallsHelper';
import { isAuthenticated } from '../utils/authHelper';
import { getCurrentDate } from '../utils/getCurrentDate';
import { isVet } from '../utils/userType';
export class ReservationApiCalls {
	baseUrl: string;

	constructor() {
		this.baseUrl = 'http://localhost:8000/reservations';
	}

	registerReservation = async (reservation) => {
		const reservationString = JSON.stringify(reservation);

		const options = createHTTPPostOptions(isAuthenticated(), reservationString);
		const promise = fetch(this.baseUrl, options);

		return promise;
	};

	getReservations = async () => {
		const options = createHttpGetOptions(isVet());
		const promise = await fetch(this.baseUrl, options);

		return promise;
	};

	getReservationsByOwner = async (OwnerId: string) => {
		const options = createHttpGetOptions(isAuthenticated());
		const url = `${this.baseUrl}?OwnerId=${OwnerId}`;

		const promise = fetch(url, options);
		return promise;
	};

	getReservationsByVetId = async (VetId: string) => {
		const options = createHttpGetOptions(isVet());
		const url = `${this.baseUrl}?VetId=${VetId}`;

		const promise = fetch(url, options);
		return promise;
	};

	getTodayReservationsByVetId = async (VetId: string) => {
		const options = createHttpGetOptions(isVet());
		const url = `${this.baseUrl}?VetId=${VetId}&Date=${getCurrentDate()}`;
		const promise = fetch(url, options);
		return promise;
	};

	cancelReservation = async (ReservationId: string | undefined) => {
		const options = createHTTPDeleteOptions(isAuthenticated());
		const url = `${this.baseUrl}/${ReservationId}`;

		const promise = fetch(url, options);

		return promise;
	};
}
