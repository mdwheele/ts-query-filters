import { FilterInterface } from './FilterInterface'
import { QueryBuilder } from '../../infra'

export class AccountActiveWithBalanceDue implements FilterInterface {
  apply(builder: QueryBuilder) {
    builder.where('active', '=', true)
      .where('balanceDue', '>=', 0)
  }
}