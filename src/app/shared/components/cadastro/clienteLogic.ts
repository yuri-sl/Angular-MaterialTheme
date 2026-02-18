import {v4 as uuid} from 'uuid';

export class ClienteLogic{
    id?:string;
    nome?:string;
    cpf?:string;
    dataNascimento?:string;
    email?:string;
    deletando?:boolean;
    uf?:string;
    municipio?:string;

    static newCliente(){
        let cliente = new ClienteLogic();
        cliente.id = uuid();

        
        return cliente;
    }
}