import { QueryBuilder, Request } from '../infra'
import { FilterInterface } from './filters/FilterInterface'
import { AccountActiveWithBalanceDue, WorksForGovernment } from './filters'

export class Accounts {
  private builder: QueryBuilder
  private filters: FilterInterface[]

  constructor(builder: QueryBuilder) {
    this.builder = builder
    this.filters = []
  }

  filterByRequest(req: Request): void {
    if (req.query?.active && req.query?.hasBalance) {
      this.filters.push(new AccountActiveWithBalanceDue())
    }

    if (req.query?.worksInGovt) {
      this.filters.push(new WorksForGovernment())
    }
  }

  run(): [] {
    this.filters.forEach(filter => filter.apply(this.builder))

    return this.builder.get()
  }
}