import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OntologycatalogService } from 'src/app/services/ontologycatalog.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
parameters: Observable<any>;
  constructor(private readonly snackBar: MatSnackBar,
    private ontologyservice: OntologycatalogService) { }

  ngOnInit(): void {
  }

  call() {
    alert("Call");
 
 this.parameters = this.ontologyservice.getAnnotationsFromID('dataset:DescriptionAbstract');
 alert("called");
 this.parameters.subscribe(val => {
      alert("Val: ");
      alert(val);
      alert(val["rdfs:label"]);
      alert(val["rdfs:comment"]);
    })
  }

}
