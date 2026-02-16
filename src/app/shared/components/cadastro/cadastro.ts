import { Component } from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule,FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FlexLayoutModule, MatCardModule, ReactiveFormsModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss'
})
export class Cadastro {
  cadastrarUserForm: FormGroup;
  constructor( private fb : FormBuilder){
    this.cadastrarUserForm = fb.group({
      nome: ['',Validators.required]
    })


  }

}
