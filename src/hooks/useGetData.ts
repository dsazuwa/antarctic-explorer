import { useGetDataQuery } from '@/store';

export default function useInitializeData() {
  const { data, isFetching, isLoading } = useGetDataQuery();

  return data === undefined || isFetching || isLoading;
}
