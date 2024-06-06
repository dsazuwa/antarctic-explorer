import { getExpeditionsUrl } from './param.utils';
import {
  DeparturesResponse,
  ExpeditionResponse,
  ExpeditionsResponse,
  SearchParams,
} from './type';

const fetchExpeditions = (searchParams: SearchParams) =>
  fetch(getExpeditionsUrl(searchParams || {})).then(
    (res) => res.json() as Promise<ExpeditionsResponse>,
  );

const fetchExpedition = (cruiseLine: string, name: string) =>
  fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/cruise-lines/${cruiseLine}/expeditions/${name}`,
  ).then(
    (res) =>
      res.json() as Promise<{
        expedition: ExpeditionResponse;
        departures: DeparturesResponse;
      }>,
  );

export { fetchExpedition, fetchExpeditions };
