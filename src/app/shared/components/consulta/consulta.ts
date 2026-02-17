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
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta',
  imports: [MatInputModule,MatButtonModule, MatCardModule, MatIconModule, MatTableModule, FlexLayoutModule, ReactiveFormsModule, MatAnchor,ReactiveFormsModule,CommonModule],
  templateUrl: './consulta.html',
  styleUrl: './consulta.scss',
})
export class Consulta implements OnInit{
  buscaForm!: FormGroup;
  displayedColumns: string[] = ['id','nome','email','cpf','dataNascimento','acoes'];
  nomeBusca:string = '';
  deletando:boolean = false;

  listaClientes!: ClienteLogic[];
  constructor(
    private fb:FormBuilder,
    private clienteService:Cliente,
    private router:Router
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

  pesquisarClienteNome(){
    let nomeBuscado = this.buscaForm.value.nome;
    this.listaClientes=this.clienteService.pesquisarCliente(nomeBuscado);
  }

  prepararEditar(id:string){
    console.log("ID RECEBIDO: ",id)
    //navegar entre páginas
    this.router.navigate(['/cadastro'],{queryParams: {"id":id}});

  }

  redirecionarCriarNovo(){
    this.router.navigate(['/cadastro']);
  }

  prepararDeletar(cliente:ClienteLogic){
    cliente.deletando = true;
  }

  deletar(cliente:ClienteLogic){
    this.clienteService.deletar(cliente);
    cliente.deletando = false;
    this.listaClientes = this.clienteService.obterStorage();
  }


}
