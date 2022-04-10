import { Input, Output, Component, EventEmitter, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UploadinterfaceconstantsService } from '../uploadinterfaceconstants.service'

@Component({
	selector: 'app-parseuploadedfile',
	templateUrl: './parseuploadedfile.component.html',
	styleUrls: ['./parseuploadedfile.component.scss']
})
export class ParseuploadedfileComponent implements OnInit {

	@Input() formatInformation: any;
	@Input() uploadinfoform: FormGroup;
	@Input() parseinfoform: FormGroup;
	@Input() parseResult: string
	@Output() submitParseEvent = new EventEmitter<string>();


	constructor(public labels: UploadinterfaceconstantsService) { }

	ngOnInit(): void {
	}

	formatValue() {
		return this.uploadinfoform.get('FileSourceFormat').value;
	}
	formNeedsLineCount(): boolean {
		let ans = false;
		const format = this.formatValue();
		if (format != null) { }
		const info = this.formatInformation[format];
		if (info != null) {
			const partition = info['dataset:partitionMethod'] as string;
			if (partition.match('dataset:PartitionToLineSet')) {
				ans = true;
			}
		}
		return ans;
	}
	getSourceCatalog(): string {
		let ans = "";
		const format = this.formatValue();
		if (format != null) { }
		const info = this.formatInformation[format];
		if (info != null) {
			ans = info['dcat:catalog'] as string;
		}
		return ans;

	}
	blockCount(): string {
		let count = "";
		const format = this.formatValue();
		if (format != null) { }
		const info = this.formatInformation[format];
		if (info != null) {
			const val = info['dataset:blocklinecount'] as string;
			if (val.length > 0) {
				count = '(' + val + ')' as string;
			}
		}
		return count;
	}

	submitParse(): void {
		this.submitParseEvent.emit('parse');
	}
}
