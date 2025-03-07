import { Component,Input, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Ontologyconstants } from '../../const/ontologyconstants';
import { LocationserviceService } from '../../services/locationservice.service';

@Component({
  selector: 'app-contactlocationinformation',
  standalone: true,
  imports: [MatCardModule, MatGridListModule, MatFormFieldModule, MatMenuModule, MatInputModule, CommonModule,ReactiveFormsModule],
  templateUrl: './contactlocationinformation.component.html',
  styleUrl: './contactlocationinformation.component.scss'
})
export class ContactlocationinformationComponent {
	
	@Input() annoinfo: any; contactlocationinfo: any | null = null;
	
	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;
	locationdata: any | null = null;
	objectform: FormGroup;
	header = 'Contact Location Information';
	searchhint = 'Enter a general location to search, e.g. a city or even a partial address';
	searchplaceholder = 'Enter location search';


	constructor(private formBuilder: FormBuilder,
	private location: LocationserviceService) {
		this.objectform = this.formBuilder.group({
			LocationAddress: ['', Validators.required],
			LocationCity: ['', Validators.required],
			LocationCountry: ['', Validators.required],
			LocationPostcode: ['', Validators.required],
			GPSLatitude: ['', Validators.required],
			GPSLongitude: ['', Validators.required],
		});
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['annoinfo'] && changes['annoinfo'].currentValue) {
			if (this.locationdata) {
				this.setData(this.locationdata);
			}
		}
	}
	onEnter(search: string): void {
		alert('You entered: ' + search);
		this.location.getLocationFromText(search).subscribe((data) => {
			this.objectform.get('LocationAddress')?.setValue(data.formatted_address);
			const addressComponents = data.address_components;
			
			const country = addressComponents.find((c: any) => c.types.includes('country'))?.long_name || '';
            const postalCode = addressComponents.find((c: any) => c.types.includes('postal_code'))?.long_name || 'N/A';
            let city = addressComponents.find((c: any) => c.types.includes('locality'))?.long_name || 'N/A';
			if(city === 'N/A') {
				city = addressComponents.find((c: any) => c.types.includes('postal_town'))?.long_name || 'N/A';
				}
			this.objectform.get('LocationCity')?.setValue(city);
			this.objectform.get('LocationCountry')?.setValue(country);
			this.objectform.get('LocationPostcode')?.setValue(postalCode);

				const location = data.geometry.location;
			
					
			this.objectform.get('GPSLatitude')?.setValue(location.lat);
			this.objectform.get('GPSLongitude')?.setValue(location.lng);
			
			
			});
		}


	setData(locationdata: any) {
		this.locationdata = locationdata;
		if (this.annoinfo) {
			this.objectform.get('LocationCity')?.setValue(locationdata[this.annoinfo['dataset:LocationCity'][this.identifier]]);
			this.objectform.get('LocationCountry')?.setValue(locationdata[this.annoinfo['dataset:LocationCountry'][this.identifier]]);
			this.objectform.get('LocationPostcode')?.setValue(locationdata[this.annoinfo['dataset:LocationPostcode'][this.identifier]]);
			this.objectform.get('LocationAddress')?.setValue(locationdata[this.annoinfo['dataset:LocationAddress'][this.identifier]]);
			const gps = locationdata[this.annoinfo['dataset:GPSLocation'][this.identifier]];
			this.objectform.get('GPSLatitude')?.setValue(gps[this.annoinfo['dataset:GPSLatitude'][this.identifier]]);
			this.objectform.get('GPSLongitude')?.setValue(gps[this.annoinfo['dataset:GPSLongitude'][this.identifier]]);
		}
		
	}

	getData(catalog:any) {
			const location: Record<any,unknown> = {};
			catalog[this.identifier] = this.annoinfo['dataset:DatabasePerson'][this.identifier];
			catalog[this.annoinfo['dataset:ContactLocationInformation'][this.identifier]] = location;
			location[this.annoinfo['dataset:LocationCity'][this.identifier]] = this.objectform.get('LocationCity')?.value || '';	
			location[this.annoinfo['dataset:LocationCountry'][this.identifier]] = this.objectform.get('LocationCountry')?.value || '';	
			location[this.annoinfo['dataset:LocationPostcode'][this.identifier]] = this.objectform.get('LocationPostcode')?.value || '';	
			location[this.annoinfo['dataset:LocationAddress'][this.identifier]] = this.objectform.get('LocationAddress')?.value || '';	
			const gpsloc: Record<any,unknown> = {};
			location[this.annoinfo['dataset:GPSLocation'][this.identifier]] = gpsloc;
			gpsloc[this.annoinfo['dataset:GPSLatitude'][this.identifier]] = this.objectform.get('GPSLatitude')!.value ?? '';
			gpsloc[this.annoinfo['dataset:GPSLongitude'][this.identifier]] = this.objectform.get('GPSLongitude')!.value ?? '';
	}
}
