import { useQuery } from '@tanstack/react-query';
import { campaignsAPI } from '../api/campaigns.api';
import { campaignKeys } from '@/shared/config';
import type { CampaignFilters } from '../api/campaigns.types';

// ============================================
// USE CAMPAIGNS HOOK
// ============================================

interface UseCampaignsOptions {
    filters?: CampaignFilters;
    enablePolling?: boolean;
    pollingInterval?: number;
}

/**
 * Hook para obtener lista de campañas con polling automático
 * @param options - Filtros y configuración de polling
 * @returns Query con lista de campañas
 */
export function useCampaigns(options: UseCampaignsOptions = {}) {
    const { filters, enablePolling = true, pollingInterval = 5000 } = options;

    return useQuery({
        queryKey: campaignKeys.list(filters),
        queryFn: () => campaignsAPI.getAll(filters),
        refetchInterval: enablePolling ? pollingInterval : false,
        staleTime: 3000,
    });
}
