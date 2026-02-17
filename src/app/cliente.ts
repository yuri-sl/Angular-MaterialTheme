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
  editar(cliente:ClienteLogic){
    let listaClientes:ClienteLogic[] = this.obterStorage();
    const clienteEncontado = listaClientes.find((c) => c.id === cliente.id);
    if(!clienteEncontado) return;

    clienteEncontado.nome = cliente.nome;
    clienteEncontado.cpf = cliente.cpf;
    clienteEncontado.dataNascimento = cliente.dataNascimento;
    clienteEncontado.email = cliente.email;

    localStorage.setItem(Cliente.REPO_CLIENTES,JSON.stringify(listaClientes));
    /* Outra abordagem
    const storage = this.obterStorage;
    storage.forEach((c) => {
      if(c.id === cliente.id){
        Object.assign(c,cliente);
      }
    })
      localStorage.setItem(Cliente.REPO_CLIENTES,JSON.stringify(storage))
    */
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

    const listaClientes:ClienteLogic[] = this.obterStorage();
    if(!nome){
      return listaClientes;
    }
    /*
    function(cliente){


    }
    */

    return listaClientes.filter(cliente => cliente.nome?.indexOf(nome) !== -1)

  }

  buscarClientePorId(id:string):ClienteLogic | undefined{
    const clientes = this.obterStorage();
    return clientes.find( cliente => cliente.id === id);
  }

  deletarClientePorId(id:string){
    let clientes = this.obterStorage();
    if(clientes.find(cliente => cliente.id === id)){
      //Encontrado
      clientes

    }
  }

  deletar(cliente:ClienteLogic){
    const storage = this.obterStorage();

    const novaLista = storage.filter(c=> c.id !== cliente.id)

    localStorage.setItem(Cliente.REPO_CLIENTES,JSON.stringify(novaLista));
  }
  
}
