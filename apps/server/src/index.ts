import Fastify from 'fastify'
import {PrismaClient} from "@prisma/client";

const fastify = Fastify({ logger: true })
const prisma = new PrismaClient()

console.log(process.env.GREETING)

fastify.get('/', async () => {
  const users = await prisma.user.findMany()
  return users
})

const start = async () => {
  try {
    await fastify.listen({ port: 3001 })
    console.log('Server running at http://localhost:3001')
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()