/* eslint-disable @typescript-eslint/no-explicit-any */

import { PayloadAction } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { Action } from 'redux';

import {
  DeparturesResponse,
  ExpeditionResponse,
  ExpeditionsResponse,
} from '@/lib/type';
import { setDepartures } from '../slice/departures.slice';
import { setExpeditions } from '../slice/expeditions.slice';
import { RootState } from '../store';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const isHydrateAction = (action: Action): action is PayloadAction<RootState> =>
  action.type === HYDRATE;

export const expeditionApi = createApi({
  reducerPath: 'expeditionApi',
  tagTypes: ['Expeditions'],

  extractRehydrationInfo(action, { reducerPath }): any {
    if (isHydrateAction(action)) return action.payload[reducerPath];
  },

  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/expeditions` }),

  endpoints: (builder) => ({
    getExpeditions: builder.query<
      ExpeditionsResponse,
      {
        page?: number;
        size?: number;
        sort?: string;
        dir?: string;
        cruiseLines?: string;
        startDate?: string;
        endDate?: string;
        'capacity.min'?: number | null;
        'capacity.max'?: number | null;
        'duration.min'?: number | null;
        'duration.max'?: number | null;
      }
    >({
      query: (args) => {
        const { sort, dir, cruiseLines, ...rest } = args;

        return {
          url: '',
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
          url: `/${id}`,
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
          url: `/${id}/departures`,
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
  useGetExpeditionQuery,
  useGetExpeditionsQuery,
  useLazyGetExpeditionsQuery,
  useGetDeparturesQuery,
  useLazyGetDeparturesQuery,
} = expeditionApi;
