

	export interface BaseInterface {
		setData(catalog: any): void;
		getData(catalog: any): void;
		}
		
  export interface BaseCatalogInterface {
		setData(catalog: any): void;
		getData(catalog: any): void;
		annotationsFound(response: any): void;
		annoinfo: any | null;
		message: string;
		catalogtype: any;
	
  }
  export interface BaseActivityInterface {
	    setPrerequisiteData(prerequisite: any): void;
		setData(catalog: any): void;
		getData(catalog: any): void;
		annotationsFound(response: any): void;
		annoinfo: any | null;
		message: string;
		catalogtype: any;
	
  }
  
