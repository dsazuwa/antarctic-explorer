import { useState } from 'react';

import { ExpeditionsResponse } from '@/lib/type';

const initialState: ExpeditionsResponse = {
  expeditions: [],
  page: 1,
  size: 5,
  totalItems: 0,
  totalPages: 0,
};

export default function useExpeditions() {
  const [state, setState] = useState<ExpeditionsResponse>(initialState);

  const setExpeditions = (data: ExpeditionsResponse) => {
    setState((prevState) => ({ ...prevState, ...data }));
  };

  return {
    ...state,
    setExpeditions,
  };
}
