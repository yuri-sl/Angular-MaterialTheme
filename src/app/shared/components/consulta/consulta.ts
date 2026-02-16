import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatAnchor } from "@angular/material/button";
import { MatButtonModule } from '@angular/material/button';
import { Cliente } from '../../../cliente';
import { ClienteLogic } from '../cadastro/clienteLogic';

@Component({
  selector: 'app-consulta',
  imports: [MatInputModule,MatButtonModule, MatCardModule, MatIconModule, MatTableModule, FlexLayoutModule, ReactiveFormsModule, MatAnchor,ReactiveFormsModule],
  templateUrl: './consulta.html',
  styleUrl: './consulta.scss',
})
export class Consulta implements OnInit{
  buscaForm!: FormGroup;

  listaClientes!: ClienteLogic[];
  constructor(
    private fb:FormBuilder,
    private clienteService:Cliente
  ){
    this.buscaForm = fb.group({
      nome:['',Validators.required],
      cpf:['']
    })
  }
  ngOnInit(): void {
    this.listaClientes = this.clienteService.obterStorage();
    console.log(this.listaClientes);
  }

  pesquisarClienteNome(nome:string){

  }


}
