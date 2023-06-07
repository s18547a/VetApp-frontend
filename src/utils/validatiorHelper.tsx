export function checkIfAllFieldAsFilled(formObject): boolean {
	for (const [name, value] of Object.entries(formObject)) {
		if (!value) {
			return false;
		}
	}

	return true;
}

export function isEmailValid(email: string): boolean {
	let isTrue: boolean = true;
	if (!email.includes('@') && email !== '') {
		isTrue = false;
	}

	return isTrue;
}
