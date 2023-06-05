import { getCurrentUser } from './authHelper';
import { isOwner } from './userType';

export class SearchListParamter {
	private Email: string = '';
	private OwnerId: string = '';
	private Name: string = '';
	private Date: string = '';

	constructor() {
		this.OwnerId = isOwner() ? getCurrentUser().userTypeId : '';
	}
	setEmail(Email: string) {
		this.Email = Email;
	}
	setName(Name: string) {
		this.Name = Name;
	}
	setDate(Date: string) {
		this.Date = Date;
	}

	allUndefined(): boolean {
		if (this.Email || this.Date || this.Name) {
			return false;
		}
		return true;
	}

	createURLString(): string {
		const urlString = this.allUndefined()
			? `?OwnerId=${this.OwnerId}`
			: `?OwnerId=${this.OwnerId}&Email=${this.Email}&Name=${this.Name}&Date=${this.Date}`;

		return urlString;
	}
}
