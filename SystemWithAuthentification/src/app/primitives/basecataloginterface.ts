export class BaseCatalogInterface {
	
	showData: boolean;
	toggleView($event) {
    this.showData = $event;
  }
  messageToJSON(responsedata: any):  any {
    const data: string = responsedata.message;
    const jsonobj = JSON.parse(data);

    return jsonobj;

  }
}