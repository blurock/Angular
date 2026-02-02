import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class CreatedateserviceService {

	constructor() { }

	todaysDateStandard(): string {
		return this.standardTime(new Date());
	}

	standardTime(date: Date): string {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
		const day = String(date.getDate()).padStart(2, '0');
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');
		const seconds = String(date.getSeconds()).padStart(2, '0');

		const yyyymmddhhmmss = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
		return yyyymmddhhmmss;
	}

	createDateFromJSONString(datestring: string): Date {
		const date = new Date(datestring);
		return date;
	}
}
