import { Injectable } from '@angular/core';
import { ClienteLogic } from './shared/components/cadastro/clienteLogic';
import { stringify } from 'uuid';

//O service Cliente é quem vai realizar toda a camada lógica.
//O cadastro.ts fica apenas para realizar a lógica de manipulação da tela mesmo.
@Injectable({
  providedIn: 'root',
})
export class Cliente {


  static REPO_CLIENTES = "_CLIENTES";

  salvar(cliente:ClienteLogic){
      //Salvar novo cliente no repoClientes
      console.log(cliente);
      let listaClientes:ClienteLogic[] = this.obterStorage();
      listaClientes.push(cliente);
      localStorage.setItem(Cliente.REPO_CLIENTES,JSON.stringify(listaClientes));
  }

  obterStorage(): ClienteLogic[] {
    const repositorioClientes = localStorage.getItem(Cliente.REPO_CLIENTES);

    if(repositorioClientes){
      //parse => Lê do JSON a String repositorioClientes
      const clientes:ClienteLogic[] = JSON.parse(repositorioClientes);
      return clientes;
    }
    const clientes:ClienteLogic[] = [];
    //stringify =. Salva no JSON como uma String
    localStorage.setItem(Cliente.REPO_CLIENTES,JSON.stringify(clientes));
    return clientes;

  }

  pesquisarCliente(nome:string) : ClienteLogic[]{
    return this.obterStorage();
  }
  
}
