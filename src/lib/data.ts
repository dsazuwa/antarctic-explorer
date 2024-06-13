import { getExpeditionsParams } from './param.utils';
import {
  ExpeditionResponse,
  ExpeditionsParams,
  ExpeditionsResponse,
  SearchParams,
} from './type';

const fetchExpeditions = (searchParams: SearchParams) => {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/expeditions`);
  const params = getExpeditionsParams(searchParams || {});

  Object.keys(params).forEach((key) => {
    const paramKey = key as keyof ExpeditionsParams;
    url.searchParams.append(paramKey, String(params[paramKey]));
  });

  return fetch(url.toString()).then(
    (res) => res.json() as Promise<ExpeditionsResponse>,
  );
};

const fetchExpedition = (cruiseLine: string, name: string) =>
  fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/cruiseLines/${cruiseLine}/expeditions/${name}`,
  ).then((res) => res.json() as Promise<ExpeditionResponse>);

export { fetchExpedition, fetchExpeditions };
