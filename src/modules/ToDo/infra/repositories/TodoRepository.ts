import { ICreateTodoDTO } from '@modules/ToDo/dtos/ICreateTodoDTO'
import { IListTodoDTO } from '@modules/ToDo/dtos/IListTodoDTO'
import { ITodoRepository } from '@modules/ToDo/repositories/ITodoRepository'
import { prisma } from '@shared/infra/database/connection'
import { v4 } from 'uuid'
import { ToDo } from '../entities/ToDo'

export class TodoRepository implements ITodoRepository {
  async create({ user_id, description, title }: ICreateTodoDTO): Promise<ToDo> {
    return await prisma.todo.create({
      data: {
        id: v4(),
        title,
        description,
        user: { connect: { id: user_id } }
      }
    })
  }

  async findById(id: string, user_id: string): Promise<ToDo> {
    return await prisma.todo.findFirst({ where: { id, user_id } })
  }

  async list({ description, title, user_id }: IListTodoDTO): Promise<ToDo[]> {
    return await prisma.todo.findMany({
      where: {
        title: { contains: title },
        description: { contains: description },
        user_id
      }
    })
  }

  async delete(id: string): Promise<ToDo> {
    return await prisma.todo.delete({ where: { id } })
  }
}
