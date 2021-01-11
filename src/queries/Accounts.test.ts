import { QueryBuilder } from '../infra'
import { Accounts } from './Accounts'

class FakeQueryBuilder implements QueryBuilder {
  where(column: string, operator: string, value: string | number | boolean): this {
    return this
  }

  orWhere(column: string, operator: string, value: string | number | boolean): this {
    return this
  }

  get(): [] {
    return []
  }
}

beforeEach(() => {
  jest.restoreAllMocks()
})

test('does not call query builder when nothing in request', () => {
  const builder = new FakeQueryBuilder()
  jest.spyOn(builder, 'where')
  jest.spyOn(builder, 'orWhere')

  const query = new Accounts(builder)

  query.filterByRequest({})

  const results = query.run()

  expect(builder.where).not.toBeCalled()
  expect(builder.orWhere).not.toBeCalled()
  expect(results.length).toBe(0)
})

test('applies filters based on query parameter', () => {
  const builder = new FakeQueryBuilder()
  jest.spyOn(builder, 'where')

  const query = new Accounts(builder)

  query.filterByRequest({
    query: {
      active: true,
      hasBalance: true,
      worksInGovt: true
    }
  })

  const results = query.run()

  expect(builder.where).toBeCalledWith('active', '=', true)
  expect(builder.where).toBeCalledWith('balanceDue', '>=', 0)
  expect(builder.where).toBeCalledWith('email', 'LIKE', '%.gov')
  expect(results.length).toBe(0)
})