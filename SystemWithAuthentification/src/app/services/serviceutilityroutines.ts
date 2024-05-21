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
                return `Unknown Server Error: ${error.message} Status: ${error.status}`;
            }

        }
    }
    public static setupHeader(token: string): HttpHeaders {
         const headerdata = new HttpHeaders()
            .set('content-type', 'application/json')
			.set('authorization', ' AccessToken ' + token)
			.set('Access-Control-Allow-Origin', '*');
		return headerdata;
    }
    /*
    public static setupHeader(): HttpHeaders {
         const userS = sessionStorage.getItem('user');
         const user = JSON.parse(userS);
         const token = user['token'];
         const headerdata = new HttpHeaders()
			.set('content-type', 'application/json')
			.set('Access-Control-Allow-Origin', '*')
			.set('Authorization', ' AccessToken ' + token);
		return headerdata;
    }
    */
}