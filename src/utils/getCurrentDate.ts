export function getCurrentDate(): string {
	let date = new Date();

	return date.toISOString().split('T')[0];
}
export function getCurrentHour(): string {
	let isoHourMinute: string = new Date().toISOString().split('T')[1];

	const hour: string = isoHourMinute.split(':')[0];
	const minute: string = isoHourMinute.split(':')[1];

	return `${hour}:${minute}`;
}
