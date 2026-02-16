import { Component } from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule,FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatAnchor } from "@angular/material/button";
import { MatIcon } from '@angular/material/icon';
import { ClienteLogic } from './clienteLogic';
import { Cliente } from '../../../cliente';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FlexLayoutModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormField,
    MatInputModule,
    MatIconModule, MatAnchor,MatIcon],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss'
})
export class Cadastro {
  cadastrarUserForm: FormGroup;
  constructor( 
    private fb : FormBuilder,
    private clienteService: Cliente
  ){
    this.cadastrarUserForm = fb.group({
      nome: ['',Validators.required],
      email: ['',Validators.required],
      cpf: ['',Validators.required],
      dataNascimento: ['',Validators.required]
    })


  }
  onSubmit(){
    console.log(this.cadastrarUserForm.value);
    this.clienteService.salvar(this.cadastrarUserForm.value);
  }
  cliente:ClienteLogic = ClienteLogic.newCliente();  

}
