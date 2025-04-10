import { PrismaClient, Telefone } from "@prisma/client"


/*const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
})*/

const prisma = new PrismaClient()

const cadastrarTelefone = async (usuarioId: number, telefone: Telefone) => {
    await prisma.telefone.create({
        data: {
            ddd: telefone.ddd,
            numero: telefone.numero,
            usuario: {
                connect: {
                    id: usuarioId
                }
            }

            //usuarioId: usuarioId
        }
    })
}

export { cadastrarTelefone }