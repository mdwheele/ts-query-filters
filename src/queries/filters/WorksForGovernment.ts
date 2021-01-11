import { FilterInterface } from './FilterInterface'
import { QueryBuilder } from '../../infra'

export class WorksForGovernment implements FilterInterface {
  apply(builder: QueryBuilder) {
    builder.where('email', 'LIKE', '%.gov')
  }
}