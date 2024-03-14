/* eslint-disable @typescript-eslint/no-explicit-any */

import { PayloadAction } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { Action } from 'redux';

import { MainResponse } from '@/lib/type';
import { RootState } from '../store';

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
    }),
  }),
});

export const { useGetDataQuery, useLazyGetDataQuery } = dataApi;
