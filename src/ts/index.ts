import { Telefone, Usuario } from '@prisma/client'
import { atualizarUsuario, cadastrarUsuario, cadastrarUsuarioTelefones, excluirUsuario, obterUsuarioCompletoPorId, obterUsuarioPorEmail, obterUsuarioPorId } from './crud/usuario/funcoes'
import { cadastrarTelefone } from './crud/telefone/funcoes';

const hj: Usuario = {
    id: 0,
    nome: "Haroldo Junior",
    email: "hj@mail.com"
}

const jp: Usuario & { telefones: Telefone[] } = {
    id: 0,
    nome: "Joao Paulo",
    email: "jp@mail.com",
    telefones: [
        {
            id: 0,
            ddd: "99",
            numero: "999999999",
            usuarioId: 0
        },
        {
            id: 0,
            ddd: "88",
            numero: "888888888",
            usuarioId: 0
        }
    ]
}


setTimeout(async () => { cadastrarUsuario(hj) }, 1000);
setTimeout(async () => { cadastrarUsuarioTelefones(jp) }, 2000);

setTimeout(async () => { obterUsuarioPorId(1) }, 6000);
setTimeout(async () => { obterUsuarioPorEmail("jp@mail.com") }, 6000);

setTimeout(async () => { obterUsuarioPorId(3000) }, 7000);

setTimeout(async () => { obterUsuarioCompletoPorId(2) }, 7000);
setTimeout(async () => { obterUsuarioCompletoPorId(1) }, 7000);

const usuarioAtualizacao: Usuario = {
    nome: "Gilberto Gil",
    email: "gbl@mail.com",
    id: 2
}

setTimeout(async () => { atualizarUsuario(usuarioAtualizacao) }, 8000);
setTimeout(async () => { obterUsuarioCompletoPorId(2) }, 20000);


const telefoneNovo: Telefone = {
    id: 0,
    usuarioId: 0,
    ddd: "77",
    numero: "777777777"
}

setTimeout(async () => { cadastrarTelefone(2, telefoneNovo) }, 10000);
setTimeout(async () => { obterUsuarioCompletoPorId(2) }, 30000);

setTimeout(async () => { excluirUsuario(2) }, 30000);
setTimeout(async () => { obterUsuarioCompletoPorId(2) }, 40000);