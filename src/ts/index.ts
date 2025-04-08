import { Telefone, PrismaClient, Usuario } from '@prisma/client'

const prisma = new PrismaClient()

const cadastrar = async (usuario: Usuario & { telefones: Telefone[] }) => {

    let resultado = await prisma.usuario.create({
        data: {
            nome: usuario.nome,
            email: usuario.email,
            telefones: {
                create: usuario.telefones.map(telefone =>({
                    ddd: telefone.ddd,
                    numero: telefone.numero
                }))
            }
        }
    })

    console.log(`Usuario cadastrado:`)
    console.log(`Nome: ${usuario.nome}, e-mail: ${usuario.email}`)
}

const usuario: Usuario & { telefones: Telefone[] } = {
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

cadastrar(usuario)