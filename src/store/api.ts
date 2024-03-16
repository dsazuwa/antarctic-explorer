/* eslint-disable @typescript-eslint/no-explicit-any */

import { PayloadAction } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { Action } from 'redux';

import {
  DeparturesResponse,
  ExpeditionResponse,
  ExpeditionsParams,
  ExpeditionsResponse,
} from '@/lib/type';
import { setDepartures } from './slice/departures.slice';
import { setExpeditions } from './slice/expeditions.slice';
import { RootState } from './store';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const isHydrateAction = (action: Action): action is PayloadAction<RootState> =>
  action.type === HYDRATE;

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['Expeditions', 'CruiseLines'],

  extractRehydrationInfo(action, { reducerPath }): any {
    if (isHydrateAction(action)) return action.payload[reducerPath];
  },

  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),

  endpoints: (builder) => ({
    getCruiseLines: builder.query<{ cruiseLines: string[] }, void>({
      query() {
        return { url: '/cruise-lines/names' };
      },
    }),

    getExpeditions: builder.query<ExpeditionsResponse, ExpeditionsParams>({
      query: (args) => {
        const { sort, dir, cruiseLines, ...rest } = args;

        return {
          url: '/expeditions',
          method: 'GET',
          params: {
            ...(sort && { sort }),
            ...(dir && { dir }),
            ...(cruiseLines && { cruiseLines }),
            ...rest,
          },
        };
      },

      async onQueryStarted(arg, api) {
        try {
          const { data } = await api.queryFulfilled;
          api.dispatch(setExpeditions(data));
        } catch (e) {
          console.error(e);
        }
      },
    }),

    getExpedition: builder.query<ExpeditionResponse, number>({
      query: (id) => {
        return {
          url: `/expeditions/${id}`,
          method: 'GET',
        };
      },
    }),

    getDepartures: builder.query<
      DeparturesResponse,
      {
        id: number;
        page?: number;
        size?: number;
        sort?: 'startDate' | 'price';
        dir?: 'asc' | 'desc';
      }
    >({
      query: (args) => {
        const { id, ...rest } = args;

        return {
          url: `/expeditions/${id}/departures`,
          method: 'GET',
          params: { ...rest },
        };
      },

      async onQueryStarted(arg, api) {
        try {
          const { data } = await api.queryFulfilled;
          api.dispatch(setDepartures(data));
        } catch (e) {
          console.error(e);
        }
      },
    }),
  }),
});

export const {
  useGetCruiseLinesQuery,
  useGetExpeditionQuery,
  useGetExpeditionsQuery,
  useLazyGetExpeditionsQuery,
  useGetDeparturesQuery,
  useLazyGetDeparturesQuery,
} = api;
