import { getExpeditionsUrl } from './param.utils';
import { ExpeditionResponse, ExpeditionsResponse, SearchParams } from './type';

const fetchExpeditions = (searchParams: SearchParams) =>
  fetch(getExpeditionsUrl(searchParams || {})).then(
    (res) => res.json() as Promise<ExpeditionsResponse>,
  );

const fetchExpedition = (cruiseLine: string, name: string) =>
  fetch(
    `http://localhost:3000/api/cruiseLines/${cruiseLine}/expeditions/${name}`,
  ).then((res) => res.json() as Promise<ExpeditionResponse>);

export { fetchExpedition, fetchExpeditions };
