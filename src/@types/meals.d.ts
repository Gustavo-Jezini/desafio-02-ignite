// eslint-disable-next-line
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    meals: {
      id: string
      title: string
      description: string
      date: string
      isOnDiet: boolean
      user_id: string
    }
  }
}
