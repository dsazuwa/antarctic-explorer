/* eslint-disable @typescript-eslint/no-explicit-any */

import { PayloadAction } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { Action } from 'redux';

import { DeparturesResponse, ExpeditionResponse } from '@/lib/type';
import { setDepartures } from './slice/departures.slice';
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
    getExpedition: builder.query<
      ExpeditionResponse,
      { id: number; name: string }
    >({
      query: ({ id, name }) => {
        return {
          url: `/cruise-lines/${id}/expeditions/${name}`,
          method: 'GET',
        };
      },
    }),

    getDepartures: builder.query<
      DeparturesResponse,
      {
        id: number;
        name: string;
        page?: number;
        size?: number;
        sort?: 'startDate' | 'price';
        dir?: 'asc' | 'desc';
      }
    >({
      query: (args) => {
        const { id, name, ...rest } = args;

        return {
          url: `/cruise-lines/${id}/expeditions/${name}/departures`,
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

export const { useGetDeparturesQuery, useLazyGetDeparturesQuery } = api;
