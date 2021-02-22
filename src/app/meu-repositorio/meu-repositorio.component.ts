import { Component, Input, OnInit } from '@angular/core';
import { MeuRepositorioModel } from '../models/meu-repositorio.model';

@Component({
  selector: 'app-meu-repositorio',
  templateUrl: './meu-repositorio.component.html',
  styleUrls: ['./meu-repositorio.component.scss']
})
export class MeuRepositorioComponent implements OnInit {

  @Input() dados: MeuRepositorioModel[] = [];

  columnDefs = [
    { headerName: 'Id', field: 'id' },
    { headerName: 'Nome', field: 'name' },
    { headerName: 'Nome Completo', field: 'full_name' },
    { headerName: 'URL', field: 'html_url' }
  ];

  rowData: any = [];

  constructor() { }

  ngOnInit() {
    // this.rowData = dados;
  }



}
