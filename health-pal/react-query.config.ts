import { QueryClient } from '@tanstack/react-query'

export const queryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 60, // 1 hour
    },
    mutations: {
      retry: false,
    },
  },
}

export const queryClient = new QueryClient(queryClientConfig)
