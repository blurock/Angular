export class BaseCatalogInterface  {
	
	showData: boolean = true;
	toggleView($event: boolean) {
    this.showData = $event;
  }
  messageToJSON(responsedata: any):  any {
    const data: string = responsedata.message;
    const jsonobj = JSON.parse(data);

    return jsonobj;

  }
}