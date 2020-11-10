import { Component, OnInit, ViewChild, AfterViewInit, AfterViewChecked } from '@angular/core';
import { OntologycatalogService } from 'src/app/services/ontologycatalog.service';
import { Observable, of } from 'rxjs';
import { CatalogbasedataComponent } from '../../catalogbasedata/catalogbasedata.component';
import { DatadatadescriptionComponent } from '../../datadatadescription/datadatadescription.component';

@Component({
  selector: 'app-repositorydatafile',
  templateUrl: './repositorydatafile.component.html',
  styleUrls: ['./repositorydatafile.component.scss']
})
export class RepositorydatafileComponent implements OnInit {

  parameters: Observable<any>;
  baseobjdata: Observable<any>;
  descriptionsuffix = 'repositoryfile';
  descriptiondata: any;

  @ViewChild('basedataobj') baseobj: CatalogbasedataComponent;
  @ViewChild('description') description: DatadatadescriptionComponent;

  constructor(private annotations: OntologycatalogService) {}

  ngOnInit(): void {
    this.annotations.getNewCatalogObject('dataset:RepositoryDataFile').subscribe({
      next: (catalog: any) => {
        const catalogobj: any = catalog.catalog;
        this.baseobjdata = of(catalogobj);
        const descr = 'descr-' + this.descriptionsuffix;
        this.descriptiondata = catalogobj[descr];
      },
      error: (info: any) => {alert('Get Annotations failed:' + info); }
    });

    }

}
