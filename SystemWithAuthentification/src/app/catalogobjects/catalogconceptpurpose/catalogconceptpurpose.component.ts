import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-catalogconceptpurpose',
  templateUrl: './catalogconceptpurpose.component.html',
  styleUrls: ['./catalogconceptpurpose.component.scss']
})
export class CatalogconceptpurposeComponent implements OnInit {

    @Input() descriptionsuffix: string;
  @Input() purpcondata: any;

  concept: string;
  purpose: string;
  fieldwidth = 'full';

  constructor() {
  }

  ngOnInit(): void {
        this.setData(this.purpcondata);
  }
  setData(info: any): void {
    const conloc = 'dataconcept-' + this.descriptionsuffix;
    this.concept = info[conloc];
    const purploc = 'purposekey-' + this.descriptionsuffix;
    this.purpose = info[purploc];
}

}
