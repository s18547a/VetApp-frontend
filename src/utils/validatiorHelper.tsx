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

export function isEmpty(value): boolean {
	let isTrue: boolean = false;
	if (value == '' || value == null || value == undefined) {
		isTrue = true;
	}
	return isTrue;
}

export function isNumberEmpty(value): boolean {
	let isTrue: boolean = false;
	if (value == '' || value == null || value == undefined || value == 0) {
		isTrue = true;
	}
	return isTrue;
}
