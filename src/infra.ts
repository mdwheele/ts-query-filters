/**
 * In a real-world application, this interface would be much wider.
 * For example purposes, we only support adding `where` conditions to a
 * query.
 */
export interface QueryBuilder {
  where(column: string, operator: string, value: string | boolean | number): this
  orWhere(column: string, operator: string, value: string | boolean | number): this
  get(): []
}

export interface Request {
  params?: {
    [key: string]: any
  }

  query?: {
    [key: string]: any
  }
}