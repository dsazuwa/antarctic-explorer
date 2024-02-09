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
        startDate?: string;
        endDate?: string;
        'capacity.min'?: number;
        'capacity.max'?: number;
        'duration.min'?: number;
        'duration.max'?: number;
      }
    >({
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
  }),
});

export const {
  useGetDataQuery,
  useLazyGetDataQuery,
  useGetExpeditionsQuery,
  useLazyGetExpeditionsQuery,
} = dataApi;
