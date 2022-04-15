import { v4 } from 'uuid'

export class ToDo {
  public readonly id: string

  public title: string
  public description?: string

  public user_id?: string

  public created_at?: Date
  public updated_at?: Date

  constructor (pros: Omit<ToDo, 'id'>, id?: string) {
    Object.assign(this, pros)

    if (!id) {
      this.id = v4()
      this.created_at = new Date()
      this.updated_at = new Date()
    }
  }
}
