import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { campaignsAPI } from '../api/campaigns.api';
import { campaignKeys } from '@/shared/config';

// ============================================
// USE RETRY CAMPAIGN HOOK
// ============================================

/**
 * Hook para reintentar sincronización de campaña fallida
 * @returns Mutation para reintentar campaña
 */
export function useRetryCampaign() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => campaignsAPI.retry(id),

        onSuccess: (updatedCampaign) => {
            // Invalidar cache
            queryClient.invalidateQueries({ queryKey: campaignKeys.lists() });
            queryClient.invalidateQueries({ queryKey: campaignKeys.detail(updatedCampaign.id) });

            message.info({
                content: `Reintentando sincronización de "${updatedCampaign.name}"...`,
                duration: 3,
            });
        },

        onError: (error: any) => {
            console.error('Error retrying campaign:', error);
        },
    });
}
