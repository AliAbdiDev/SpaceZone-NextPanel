import { TableMeta } from './dataTable/dataTable';

export interface FetchResultTotalItems<EntityKey extends string, TItem> {
  data: {
    [K in EntityKey]: {
      items: TItem[];
      meta: TableMeta;
    };
  };
}
export interface FetchResultSingleItem<EntityKey extends string, TItem> {
  data: {
    [K in EntityKey]: TItem;
  };
}
