import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import {GOOGLE_MAP_KEY} from '../tokens';

@Injectable({
	providedIn: 'root'
})
export class LocationserviceService {

	constructor(public authService: AuthService,
		private httpClient: HttpClient,
	@Inject(GOOGLE_MAP_KEY) private mapkey: string) {

	}


	getLocationFromText(searchstring: string): Observable<any> {
		const apiKey = this.mapkey;
		const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(searchstring)}&key=${apiKey}`;

		return this.httpClient.get(url).pipe(
			map((response: any) => {
				if (response.status === 'OK' && response.results.length > 0) {
					const result = response.results[0];
					console.log("getLocationFromText()  " + JSON.stringify(result));
					return result; // Return the result directly
				} else {
					return null; // Return null if no results
				}
			}),
			catchError(error => { // Handle potential errors
				console.error("Error in getLocationFromText():", error);
				return of(null); // Return null in case of error
			})
		);
	}
}