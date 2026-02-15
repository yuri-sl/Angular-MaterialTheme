import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { CrudPage } from './pages/crud-page/crud-page';
import { Cadastro } from './shared/components/cadastro/cadastro';
import { Consulta } from './shared/components/consulta/consulta';

export const routes: Routes = [
    {path:'crud',component:CrudPage},
    {path:'cadastro',component:Cadastro },
    {path:'consulta',component:Consulta}
];
