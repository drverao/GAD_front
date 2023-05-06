import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogoCriterioComponent } from '../dialogo-criterio/dialogo-criterio.component';
import { DialogoSubcriterioComponent } from '../dialogo-subcriterio/dialogo-subcriterio.component';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeNodeToggle } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { ModeloService } from 'src/app/services/modelo.service';
import Swal from 'sweetalert2';
import { Modelo } from 'src/app/models/Modelo';


export interface PeriodicElement {
  nombre: string;
  descripcion: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { nombre: 'criterio 1', descripcion: 'esta es la descripcion 2' },
  { nombre: 'criterio 2', descripcion: 'esta es la descripcion 2' },
  { nombre: 'criterio 3', descripcion: 'esta es la descripcion 2' },
];


interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [{ name: 'Apple' }, { name: 'Banana' }, { name: 'Fruit loops' }],
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [{ name: 'Broccoli' }, { name: 'Brussels sprouts' }],
      },
      {
        name: 'Orange',
        children: [{ name: 'Pumpkins' }, { name: 'Carrots' }],
      },
    ],
  },
];

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-dialogo-modelo',
  templateUrl: './dialogo-modelo.component.html',
  styleUrls: ['./dialogo-modelo.component.css']
})
export class DialogoModeloComponent implements OnInit {

  modelo: Modelo = new Modelo();

  constructor(private _formBuilder: FormBuilder, private dialog: MatDialog, private router: Router, private modelo_service: ModeloService) { this.ddd.data = TREE_DATA; }

  ngOnInit(): void {

  }



  //metodo para crear un modelo
  public createModelo(): void {
    console.log(this.modelo);
    if (this.modelo.fecha_inicio == null || this.modelo.fecha_fin == null || this.modelo.fecha_final_act == null) {
      Swal.fire('Error', `Debe llenar todos los campos`, 'error');
      return;
    }
    this.modelo_service.createModelo(this.modelo).subscribe(
      response => {
        this.router.navigate(['/modelo']);
        console.log(response);
        Swal.fire('Modelo creado', `Modelo creado con éxito`, 'success');
      }
    )
  }

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  isLinear = false;
  displayedColumns: string[] = ['nombre', 'descripcion', 'subcriterio'];
  dataSource = ELEMENT_DATA;

  abrirDialogo(): void {
    const dialogRef = this.dialog.open(DialogoCriterioComponent, {
      width: '50%',
      data: { /* datos que se pasan al diálogo */ }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se cerró');
    });
  }
  addSubcriterio(): void {
    const dialogRef = this.dialog.open(DialogoSubcriterioComponent, {
      width: '50%',
      data: { /* datos que se pasan al diálogo */ }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se cerró');
    });
  }

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  ddd = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;


}
