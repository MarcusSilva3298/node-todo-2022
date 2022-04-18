import { ICreateTodoDTO } from '@modules/ToDo/dtos/ICreateTodoDTO'
import { IListTodoDTO } from '@modules/ToDo/dtos/IListTodoDTO'
import { ITodoRepository } from '@modules/ToDo/repositories/ITodoRepository'
import { prisma } from '@shared/infra/database/connection'
import { v4 } from 'uuid'
import { ToDo } from '../entities/ToDo'

export class TodoRepository implements ITodoRepository {
  async create({ description, title }: ICreateTodoDTO): Promise<ToDo> {
    const todo = new ToDo({ description, title })

    return await prisma.todo.create({ data: todo })
  }

  async findById(id: string): Promise<ToDo> {
    return await prisma.todo.findFirst({ where: { id } })
  }

  async list({ description, title }: IListTodoDTO): Promise<ToDo[]> {
    return await prisma.todo.findMany({
      where: {
        title: { contains: title },
        description: { contains: description }
      }
    })
  }

  async delete(id: string): Promise<ToDo> {
    return await prisma.todo.delete({ where: { id } })
  }
}
