import { Component, OnInit, ViewChild } from '@angular/core';
import { OntologycatalogService } from 'src/app/services/ontologycatalog.service';
import { Observable } from 'rxjs';
import { CatalogbasedataComponent } from '../../catalogbasedata/catalogbasedata.component';

@Component({
  selector: 'app-repositorydatafile',
  templateUrl: './repositorydatafile.component.html',
  styleUrls: ['./repositorydatafile.component.scss']
})
export class RepositorydatafileComponent implements OnInit {

  parameters: Observable<any>;
  descriptionsuffix = 'repositoryfile';

  @ViewChild('basedataobj') baseobj: CatalogbasedataComponent;

  constructor(private annotations: OntologycatalogService) {}
  ngOnInit(): void {
    this.annotations.getNewCatalogObject('dataset:RepositoryDataFile').subscribe({
      next: (catalog: any) => {
        alert('Recieved from RepositorydatafileComponent');
        alert(JSON.stringify(catalog));
        alert(JSON.stringify(catalog.catalog));
        this.baseobj.setData(catalog.catalog);
      },
      error: (info: any) => {alert('Get Annotations failed:' + info); }
    });
  }

}
