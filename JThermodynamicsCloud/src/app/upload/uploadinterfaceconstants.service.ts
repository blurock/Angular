import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadinterfaceconstantsService {
  
  	public filemediatype = "text/*";
	public filemediasubtype = "";
	public uploadfilesource = "dataset:LocalFileSystem";
	public maintainer = "Administrator";
	public collectionobjecttype = "";
	
	public addreference = 'Add Reference';
	public bibliolabel = 'Full Title';
	public bibliohint = 'The full title of the manuscript, paper or report';
	public referencelabel = 'Bibliographic Reference';
	public referencehint = 'One line reference indicating publication, date, pages, etc.';
	public doilabel = 'Identification';
	public doihint = 'The DOI or ISBN or any other appropriate identifier';

  public linecountlabel = 'Lines in Block';
  public linecounthint = 'The number of lines in each parsed block of the file'
  
  public partitionMethodlabel = 'Partition Method'
  public partitionMethodhint = 'The method to partition into individual blocks to be interpreted'
  
  public cataloglabel = "Database Object";
  public cataloghint = "This is the data that is stored for each block";
  
  public unitclasslabel = "Unit Class";
  public unitclasshint = "The class of unit that is needed";
  public unitspecificlabel = "Chosen Unit";
  public unitspecifichint = "The specific unit of the parameter"
  public uncertaintylabel = "Uncertainty Type";
  public uncertaintyhint = "The type of uncertainty of the parameter";
  public enthalpylabel = 'Enthalpy';
  
  public parameterlabellabel = "Parameter Label";
  public parameterlabelhint = "The label assigned to the parameter";
  

  constructor() { }
}
