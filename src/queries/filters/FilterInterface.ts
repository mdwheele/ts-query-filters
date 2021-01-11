import { QueryBuilder } from "../infra/QueryBuilder";

export interface FilterInterface {
  apply(builder: QueryBuilder): void
}