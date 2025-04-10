import { Usuario, Telefone, PrismaClient } from "@prisma/client"

/*const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
})*/

const prisma = new PrismaClient()

const cadastrarUsuario = async (usuario: Usuario) => {

    await prisma.usuario.create({
        data: {
            nome: usuario.nome,
            email: usuario.email
        }
    })

    console.log(`-----------------------`)
    console.log(`Usuario cadastrado:`)
    console.log(`Nome: ${usuario.nome}, e-mail: ${usuario.email}`)
    console.log(`-----------------------\n`)
}

const cadastrarUsuarioTelefones = async (usuario: Usuario & { telefones: Telefone[] }) => {

    await prisma.usuario.create({
        data: {
            nome: usuario.nome,
            email: usuario.email,
            telefones: {
                create: usuario.telefones.map(telefone => ({
                    ddd: telefone.ddd,
                    numero: telefone.numero
                }))
            }
        }
    })

    console.log(`-----------------------`)
    console.log(`Usuario cadastrado:`)
    console.log(`Nome: ${usuario.nome}, e-mail: ${usuario.email}`)
    console.log(`Telefones cadastrados:`)
    usuario.telefones.forEach(telefone => {
        console.log(`DDD: (${telefone.ddd}) ${telefone.numero}`)
    })
    console.log(`-----------------------\n`)
}

const obterUsuarioPorId = async (usuarioId: number) => {
    const usuario = await prisma.usuario.findUnique({
        where: {
            id: usuarioId
        }
    })

    if (usuario) {
        console.log(`-----------------------`)
        console.log(`Usuário obtido (por ID):`)
        console.log(`Nome: ${usuario.nome} e-mail: ${usuario.email}`)
        console.log(`-----------------------\n`)
    } else {
        console.log(`-----------------------`)
        console.log(`Usuário não encontrado na base de dados`)
        console.log(`-----------------------\n`)
    }
}

const obterUsuarioPorEmail = async (usuarioEmail: string) => {
    const usuario = await prisma.usuario.findUnique({
        where: {
            email: usuarioEmail
        }
    })

    if (usuario) {
        console.log(`-----------------------`)
        console.log(`Usuário obtido (por e-mail):`)
        console.log(`Nome: ${usuario.nome} e-mail: ${usuario.email}`)
        console.log(`-----------------------\n`)
    } else {
        console.log(`-----------------------`)
        console.log(`Usuário não encontrado na base de dados`)
        console.log(`-----------------------\n`)
    }
}

const obterUsuarioCompletoPorId = async (usuarioId: number) => {
    const usuario = await prisma.usuario.findUnique({
        where: {
            id: usuarioId
        },
        include: {
            telefones: true
        }
    })

    if (usuario) {
        console.log(`-----------------------`)
        console.log(`Usuário obtido completo:`)
        console.log(`Nome: ${usuario.nome} e-mail: ${usuario.email}`)
        if (usuario.telefones.length > 0) {
            console.log(`Telefones:`)
            usuario.telefones.forEach(telefone => {
                console.log(`DDD: (${telefone.ddd}) ${telefone.numero}`)
            })
        }
        console.log(`-----------------------\n`)
    } else {
        console.log(`-----------------------`)
        console.log(`Usuário não encontrado na base de dados`)
        console.log(`-----------------------\n`)
    }
}

const atualizarUsuario = async (usuario: Usuario) => {
    const usuarioAtualizado = await prisma.usuario.update({
        where: {
            id: usuario.id
        },
        data: usuario
    })

    console.log(`-----------------------`)
    console.log(`Usuario atualizado:`)
    console.log(`Nome: ${usuarioAtualizado.nome}, e-mail: ${usuarioAtualizado.email}`)
    console.log(`-----------------------\n`)
}

const excluirUsuario = async (usuarioId: number) => {
    const usuarioExcluído = await prisma.usuario.delete({
        where: {
            id: usuarioId,
        },
        include: {
            telefones: true
        }
    })
    console.log(`-----------------------`)
    console.log(`Usuario excluído:`)
    console.log(`Nome: ${usuarioExcluído.nome}, e-mail: ${usuarioExcluído.email}`)
    console.log(`-----------------------\n`)
}

export {
    cadastrarUsuario,
    cadastrarUsuarioTelefones,
    obterUsuarioPorId,
    obterUsuarioPorEmail,
    obterUsuarioCompletoPorId,
    atualizarUsuario,
    excluirUsuario
}