import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { CheckboxRenderer } from '../shared/checkbox-renderer.component';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MeuRepositorioComponent } from './meu-repositorio/meu-repositorio.component';
import { GenericService } from './service/generic.service';

@NgModule({
  declarations: [
    AppComponent,
    MeuRepositorioComponent,
    CheckboxRenderer
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgGridModule.withComponents(CheckboxRenderer),
    HttpClientModule
  ],
  providers: [
    GenericService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
