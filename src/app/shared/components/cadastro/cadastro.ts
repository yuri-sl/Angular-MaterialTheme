import { Component,inject,OnInit, Query } from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule,FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatAnchor } from "@angular/material/button";
import { MatIcon } from '@angular/material/icon';
import { ClienteLogic } from './clienteLogic';
import { Cliente } from '../../../cliente.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import {NgxMaskDirective,provideNgxMask} from 'ngx-mask';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Brasilapi } from '../../../brasilapi.service';
import { Estado, Municipio } from '../../../brasilapi.models';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FlexLayoutModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormField,
    MatInputModule,
    MatIconModule, 
    MatAnchor,
    MatIcon,
    CommonModule,NgxMaskDirective,MatSelectModule],
    providers:[provideNgxMask()],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss'
})
export class Cadastro implements OnInit{
  cadastrarUserForm: FormGroup;
  atualizando:boolean = false;
  cliente:ClienteLogic = ClienteLogic.newCliente();  
  private _snackBar = inject(MatSnackBar);
  estados: Estado[] = [];
  municipios: Municipio[] = [];

  constructor( 
    private fb : FormBuilder,
    private clienteService: Cliente,
    private route:ActivatedRoute,
    private router:Router,
    private brasilApiService:Brasilapi
  ){
    this.cadastrarUserForm = fb.group({
      id:['',Validators.required],
      nome: ['',Validators.required],
      email: ['',Validators.required],
      cpf: ['',Validators.required],
      dataNascimento: ['',Validators.required],
      uf:['',Validators.required],
      municipio:['',Validators.required]
    })


  }
  ngOnInit(): void {
    this.carregarDadosCliente();
    this.carregarUFs();
    console.log(this.cadastrarUserForm.value);
  }
  onSubmit(){
    console.log(this.cadastrarUserForm.value);
    const formValue = this.cadastrarUserForm.getRawValue();
    const idCliente = String(formValue.id ?? '');

    const clientePayload: ClienteLogic = {
      id: idCliente,
      nome: String(formValue.nome ?? '').trim(),
      email: String(formValue.email ?? '').trim(),
      cpf: String(formValue.cpf ?? '').trim(),
      dataNascimento: String(formValue.dataNascimento ?? ''),
      uf:String(formValue.uf??''),
      municipio:String(formValue.municipio??'')
    };
    console.log(this.verificarSeClienteExiste(idCliente));

    if(!this.verificarSeClienteExiste(idCliente)){
      console.log("Cliente não existe");
      let newCliente = ClienteLogic.newCliente();
      const clienteNovo: ClienteLogic = {
        ...clientePayload,
        id: String(newCliente.id)
      };
      this.clienteService.salvar(clienteNovo);
      console.log('Cliente salvo!');
      this.openSnackBar('Cliente salvo','ok');



    }
    else{
      console.log('cliente já existe')
      const formValue = this.cadastrarUserForm.getRawValue();
      const clienteEditar:ClienteLogic = {
        id:String(formValue.id),
        nome:String(formValue.nome),
        email:String(formValue.email),
        cpf:String(formValue.cpf),
        dataNascimento:String(formValue.dataNascimento),
        uf:String(formValue.uf??''),
        municipio:String(formValue.municipio??'')
      };
      this.clienteService.editar(clienteEditar);
      console.log("Cliente editado!");
      this.openSnackBar('Cliente editado','ok');

    }
    this.router.navigate(['/consulta']);
  }

  carregarDadosCliente():void{
      this.route.queryParamMap.subscribe( (query:any) => {
      //const params = query['params'];
      //const id = params['id'];
      const id = query.get('id');
      // console.log("Parâmetros: ",params);
      if(id){
        this.atualizando = true;
        console.log(this.atualizando);
        //se n encontrar nenhum cliente ent vai criar um novo
        this.cliente = this.clienteService.buscarClientePorId(id) || ClienteLogic.newCliente();
        console.log(this.cliente);
        this.cadastrarUserForm.patchValue({
          id:this.cliente.id,
          nome:this.cliente.nome,
          email:this.cliente.email,
          cpf:this.cliente.cpf,
          dataNascimento:this.cliente.dataNascimento,
          uf:this.cliente.uf,
        });
        console.log('Form preenchido:', this.cadastrarUserForm.value);
      }
    })

  }
  verificarSeClienteExiste(id:string):boolean{
    let clienteEncontrado = this.clienteService.buscarClientePorId(id);
    if(clienteEncontrado === undefined){
      return false;
    }
    return true;
  }
  openSnackBar(message:string,action:string){
    this._snackBar.open(message,action);
  }

  carregarUFs(){
    //observable subscribe. Subscribe O subscribe é necessário pois o observable fica observando para ver se
    //recebe uma resposta, e quando isso acontece o subscribe precisa notificar que uma resposta foi recebida
    this.brasilApiService.listarUFs().subscribe({
      next: listaEstados => {
        console.log("lista estados",listaEstados);
        this.estados = listaEstados;
      } ,
      error: erro => {
        console.log("ocorreu um erro: ",erro)
      } 
    });
  }

  carregarMunicipios(ufSelecionada:string,municipioSelecionado?:String):void{
    console.log("Carregando municipios")
    if(!ufSelecionada){
      this.municipios = [];
      this.cadastrarUserForm.patchValue({municipio:''});
      return;
    }

    this.brasilApiService.listarMunicipios(ufSelecionada).subscribe({
      next: listaMunicipios => {
        this.municipios = listaMunicipios
        if(municipioSelecionado){
          this.cadastrarUserForm.patchValue({municipio:municipioSelecionado});
        }
      },
      error: err => {

        console.error(err)
      } 
    })
    console.log(this.municipios);
  }


}
