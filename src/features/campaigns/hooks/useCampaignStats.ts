import { useQuery } from '@tanstack/react-query';
import { campaignsAPI } from '../api/campaigns.api';
import { campaignKeys } from '@/shared/config';

// ============================================
// USE CAMPAIGN STATS HOOK
// ============================================

interface UseCampaignStatsOptions {
    enablePolling?: boolean;
    pollingInterval?: number;
}

/**
 * Hook para obtener estadísticas de campañas con polling
 * @param options - Configuración de polling
 * @returns Query con estadísticas
 */
export function useCampaignStats(options: UseCampaignStatsOptions = {}) {
    const { enablePolling = true, pollingInterval = 10000 } = options;

    return useQuery({
        queryKey: campaignKeys.stats(),
        queryFn: () => campaignsAPI.getStats(),
        refetchInterval: enablePolling ? pollingInterval : false,
        staleTime: 5000,
    });
}
