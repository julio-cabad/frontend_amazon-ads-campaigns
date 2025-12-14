import { QueryClient } from '@tanstack/react-query';

// ============================================
// REACT QUERY CONFIGURATION
// ============================================

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // Configuración para polling y cache
            refetchOnWindowFocus: true,
            refetchOnReconnect: true,
            retry: 1,
            staleTime: 3000, // 3 segundos
            gcTime: 5 * 60 * 1000, // 5 minutos (antes era cacheTime)
        },
        mutations: {
            retry: 0,
        },
    },
});

// ============================================
// QUERY KEYS FACTORY
// ============================================

export const campaignKeys = {
    all: ['campaigns'] as const,
    lists: () => [...campaignKeys.all, 'list'] as const,
    list: (filters?: Record<string, unknown>) => [...campaignKeys.lists(), filters] as const,
    details: () => [...campaignKeys.all, 'detail'] as const,
    detail: (id: string) => [...campaignKeys.details(), id] as const,
    stats: () => [...campaignKeys.all, 'stats'] as const,
} as const;
