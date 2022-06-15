import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';

export class ServiceUtilityRoutines {
     public static getServerErrorMessage(error: HttpErrorResponse): string {
        switch (error.status) {
            case 404: {
                return `Not Found: ${error.message}`;
            }
            case 403: {
                return `Access Denied: ${error.message}`;
            }
            case 500: {
                return `Internal Server Error: ${error.message}`;
            }
            default: {
                return `Unknown Server Error: ${error.message}`;
            }

        }
    }
    
    public static setupHeader(): HttpHeaders {
         		const headerdata = new HttpHeaders()
			.set('content-type', 'application/json')
			.set('Authorization', ' AccessToken xxxxxxx')
			.set('Access-Control-Allow-Origin', '*');
		return headerdata;
    }
}