import { ICreateTodoDTO } from '../dtos/ICreateTodoDTO'
import { IListTodoDTO } from '../dtos/IListTodoDTO'
import { ToDo } from '../infra/entities/ToDo'

export interface ITodoRepository {
  create(data: ICreateTodoDTO): Promise<ToDo>

  findById(todo_id: string, user_id: string): Promise<ToDo>

  list(data: IListTodoDTO): Promise<ToDo[]>

  delete(todo_id: string): Promise<ToDo>
}
