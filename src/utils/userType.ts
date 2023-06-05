import { UserType } from '../classes/Other';
import { getCurrentUser } from './authHelper';

export function isOwner(): boolean {
	return getCurrentUser().userType == UserType.Owner;
}
export function isVet(): boolean {
	return getCurrentUser().userType == UserType.Vet;
}

export function isManager(): boolean {
	return getCurrentUser().isManager && isLogged();
}

function isLogged(): boolean {
	return getCurrentUser();
}

export function getUserName(): string {
	if (isLogged()) {
		if (getCurrentUser().userType == UserType.Owner) {
			return 'Klient';
		} else {
			if (isManager()) {
				return 'Zarządca';
			} else return 'Weterynarz';
		}
	} else return '';
}
