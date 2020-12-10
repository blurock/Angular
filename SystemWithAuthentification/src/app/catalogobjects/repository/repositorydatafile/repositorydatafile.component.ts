import { Component, OnInit, ViewChild} from '@angular/core';
import { OntologycatalogService } from 'src/app/services/ontologycatalog.service';
import { Observable} from 'rxjs';
import { CatalogbasedataComponent } from '../../catalogbasedata/catalogbasedata.component';
import { DatadatadescriptionComponent } from '../../datadatadescription/datadatadescription.component';
import { CatalogidComponent } from '../../catalogid/catalogid.component';
import { BaseCatalogInterface } from 'src/app/primitives/basecataloginterface';

@Component({
  selector: 'app-repositorydatafile',
  templateUrl: './repositorydatafile.component.html',
  styleUrls: ['./repositorydatafile.component.scss']
})
export class RepositorydatafileComponent extends BaseCatalogInterface implements OnInit {

  type = 'type';
  simpleName: string;
  simpleNametip: string;
  title = 'one line description';
  titletip: string;
  showExtra = false;

  parameters: Observable<any>;
  baseobjdata: any;
  descriptionsuffix = 'repositoryfile';
  descriptiondata: any;
  catidobj: any;
  catalogobj: any;
  annoinfo: any;
  reflabel: string;

  @ViewChild('basedataobj') baseobj: CatalogbasedataComponent;
  @ViewChild('description') description: DatadatadescriptionComponent;
  @ViewChild('catid') catid: CatalogidComponent;

  constructor(private annotations: OntologycatalogService) {
    super();
  }

  ngOnInit(): void {
    this.annotations.getNewCatalogObject('dataset:RepositoryDataFile').subscribe({
      next: (responsedata: any) => {
        const catalog = this.messageToJSON(responsedata);
        this.catalogobj = catalog.catalog;
        this.annoinfo = catalog.annotations;
        this.baseobjdata = this.catalogobj;
        const descr = 'descr-' + this.descriptionsuffix;
        this.descriptiondata = this.catalogobj[descr];
        this.catidobj = this.catalogobj.catid;
        this.reflabel = 'ref';
      },
      error: (info: any) => { alert('Get Annotations failed:' + info); }
    });
  }

  setData(info: any, annoinfo: any): void {
    if (this.baseobj != null) {
      this.baseobj.setData(info, annoinfo);
    }
    if (this.description != null) {
      const descr = 'descr-' + this.descriptionsuffix;
      this.description.setData(info[descr], annoinfo);
    }
    if (this.catid != null) {
      this.catid.setData(info.catid, annoinfo);
    }

  }
  saveit(){
    alert(JSON.stringify(this.catalogobj.ref));
  }
  refinfochange($event) {
  }
}
