/* eslint-disable @typescript-eslint/no-explicit-any */

import { PayloadAction } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { Action } from 'redux';

import { ExpeditionsResponse, MainResponse } from '@/lib/type';
import { RootState } from '..';
import { setData, setExpeditions } from '../slice/data.slice';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const isHydrateAction = (action: Action): action is PayloadAction<RootState> =>
  action.type === HYDRATE;

export const dataApi = createApi({
  reducerPath: 'dataApi',
  tagTypes: ['Expeditions', 'CruiseLines'],

  extractRehydrationInfo(action, { reducerPath }): any {
    if (isHydrateAction(action)) return action.payload[reducerPath];
  },

  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),

  endpoints: (builder) => ({
    getData: builder.query<MainResponse, void>({
      query() {
        return { url: '' };
      },

      async onQueryStarted(arg, api) {
        try {
          const { data } = await api.queryFulfilled;
          api.dispatch(setData(data));
        } catch (e) {
          console.error(e);
        }
      },
    }),

    getExpeditions: builder.query<
      ExpeditionsResponse,
      {
        page?: number;
        size?: number;
        sort?: string;
        dir?: string;
        cruiseLines?: string;
        'duration.min'?: number;
        'duration.max'?: number;
      }
    >({
      query: (args) => {
        const { page, size, sort, dir, cruiseLines } = args;

        return {
          url: '/expeditions',
          method: 'GET',
          params: {
            ...(page !== undefined && { page }),
            ...(size !== undefined && { size: size }),
            ...(sort && { sort }),
            ...(dir && { dir }),
            ...(cruiseLines && { cruiseLines }),

            ...(args['duration.min'] !== undefined && {
              'duration.min': args['duration.min'],
            }),
            ...(args['duration.max'] !== undefined && {
              'duration.max': args['duration.max'],
            }),
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
  }),
});

export const {
  useGetDataQuery,
  useLazyGetDataQuery,
  useGetExpeditionsQuery,
  useLazyGetExpeditionsQuery,
} = dataApi;
