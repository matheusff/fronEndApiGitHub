import { Component, ViewChild, OnInit } from '@angular/core';
import { MeuRepositorioModel } from './models/meu-repositorio.model';
import { MeuRepositorioComponent } from './meu-repositorio/meu-repositorio.component';
import { GenericService } from './service/generic.service';
import { CheckboxRenderer } from '../shared/checkbox-renderer.component';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Desafio GitHub API';
  mostraMeuRepositorio = false;
  dadosMeuRepositorio: MeuRepositorioModel[] = [];

  //public modules: Module[] = AllCommunityModules;
  private defaultColDef;
  private rowSelection;
  private gridApi;
  private gridColumnApi;
  private isRowSelectable;
  private frameworkComponents;
  rowData: MeuRepositorioModel[] = [];
  rowSelect: MeuRepositorioModel[] = [];
  rowRepos: any = [];
  columnDefs: any = [];
  private readonly url = 'https://localhost:44361/api/repositorio';
  private readonly urlFavorito = 'https://localhost:44361/api/favorito';
  private readonly urlFavoritoExcluir = 'https://localhost:44361/api/favorito';

  gridOptions = {
       
    onRowClicked: event => this.cellClickedHandler(event)
  
}

  constructor(private service: GenericService) {

    this.columnDefs = [
      {
        headerName: 'Favorito',
        field: 'favorito',
        width: 100,
        headerCheckboxSelection: true,
        //headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
        cellRenderer: 'checkboxRenderer',
      },

      { 
        headerName: 'Nome', 
        field: 'name',
        cellRendererParams: {
          onClick: (params) => this.cellClickedHandler(params)  
        }
      }
    ];

    this.defaultColDef = {
      flex: 1,
      minWidth: 100,
      resizable: true,
    };
    this.rowSelection = 'multiple';

    this.isRowSelectable = function (rowNode) {
      // return rowNode.data ? rowNode.data.favorito == : false;
      return rowNode.data.favorito;
    };

    this.frameworkComponents = {
      checkboxRenderer: CheckboxRenderer,
    };

  }

  ngOnInit() {
    this.service.obter(this.url)
      .subscribe((data: MeuRepositorioModel[]) =>
        this.rowRepos = data,
      );
    this.mostraMeuRepositorio = false;
  }

  //constructor(private service: GenericService) { }

  clickMeusRepositorios() {
    this.service.obter(this.url)
      .subscribe((data: MeuRepositorioModel[]) =>
        this.rowData = data
      );
    this.mostraMeuRepositorio = true;
    var x = this.isRowSelectable;
  }

  onKey(event: any) { // without type info
    this.rowData = [];
    let meuRepositorioModel = new MeuRepositorioModel;
    let match = false;
    if (this.rowRepos != null || this.rowRepos != undefined || this.rowRepos.length > 0) {
      this.rowRepos.forEach(function (item) {
        if (item.name == event.target.value) {
          meuRepositorioModel.id = item.id;
          meuRepositorioModel.name = item.name;
          meuRepositorioModel.full_name = item.full_time;
          meuRepositorioModel.html_url = item.html_url;
          meuRepositorioModel.description = item.description;
          meuRepositorioModel.language = item.language;
          meuRepositorioModel.updated_at = item.update_at;
          meuRepositorioModel.favorito = item.favorito;
          match = true;
        }
      });

      if (match) {
        this.rowData.push(meuRepositorioModel);
        this.mostraMeuRepositorio = true;
      } else
        this.mostraMeuRepositorio = false;
    }
  }

  onSelectionChanged = (event) => {
    let x = event.api.getSelectedRows();
    this.rowSelect = event.api.getSelectedRows();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  getSelectedRowData() {
    let selectedNodes = this.gridApi.getSelectedNodes();
    let selectedData = selectedNodes.map(node => node.data);
    // if (selectedData.length = 0) {
    //   selectedData = new MeuRepositorioComponent;
    // }      
    //alert(`Selected Nodes:\n${JSON.stringify(selectedData)}`);
    let x = this.service.postView(selectedData, this.urlFavorito)
      .subscribe(
        (resultado: MeuRepositorioModel[]) => {
          this.rowData = resultado
        },
        erro => {
            console.log(erro);
        }
        // data => (data: MeuRepositorioModel[]) => {
        // this.rowData = data;
      );

    return selectedData;
  }

  getSelectedRowDataExcluir() {    
    this.service.delete(this.urlFavoritoExcluir)
      .subscribe(data => {
        console.log(data);
        },
        erro => {
            console.log(erro);
        }
        // data => (data: MeuRepositorioModel[]) => {
        // this.rowData = data;
      );
  }

  cellClickedHandler = (event) => {
    console.log('The row was clicked');
    $("#txtNome").val(event.data.name);
    $("#txtDescricao").val(event.data.description);
    $("#txtLinguagem").val(event.data.language);
    $("#txtUltimaAtualizacao").val(event.data.updated_at);
    $("#txtDono").val(event.data.owner.login);
  }

}
