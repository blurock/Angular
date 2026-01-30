import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Ontologyconstants } from 'systemconstants';
import {MatCardModule} from '@angular/material/card'; 
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {ReactiveFormsModule} from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip'; 
import { FormsModule } from '@angular/forms';
import {DoiComponent} from '../../../primitives/doi/doi.component';
import {MultiplerecordsComponent} from '../../multiplerecords/multiplerecords.component';

@Component({
  selector: 'app-referenceinformation',
  templateUrl: './referenceinformation.component.html',
  styleUrls: ['./referenceinformation.component.scss'],
  standalone: true,
  imports: [MatCardModule,MatFormFieldModule,ReactiveFormsModule,MatTooltipModule,FormsModule,DoiComponent,MultiplerecordsComponent]
})
export class ReferenceinformationComponent implements OnChanges {

  @Input() annoinfo: any| null = null;
  @Input() refinfo: any | null = null;
  @Output() refinfoChange = new EventEmitter<any>();


  reftitletitle: string = 'Title';
  reftitlecomment: string = 'General Comment';
  refreftitle: string = 'Reference Title';
  refrefcomment: string = 'Reference Comment';
  refdoititle: string = 'DOI title';
  refdoicomment: string = 'DOI comment';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['annoinfo'] && changes['annoinfo'].currentValue) {
		if(changes['refinfo'] && changes['refinfo'].currentValue)
		this.setData(this.refinfo, this.annoinfo);
		}
    }
  


  setData(info: any, anno: any): void {
	if(anno != null) {
    const annotitle = anno.reftitle;
    this.reftitletitle = annotitle[Ontologyconstants.rdfslabel];
    this.reftitlecomment = annotitle[Ontologyconstants.rdfscomment];

    const annorefstr = anno.refstr;
    this.refreftitle = annorefstr[Ontologyconstants.rdfslabel];
    this.refrefcomment = annorefstr[Ontologyconstants.rdfscomment];

    const annodoi = anno.doi;
    this.refdoititle = annodoi[Ontologyconstants.rdfslabel];
    this.refdoicomment = annodoi[Ontologyconstants.rdfscomment];
}
  }

}
