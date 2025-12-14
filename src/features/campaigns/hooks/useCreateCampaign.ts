import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { campaignsAPI } from '../api/campaigns.api';
import { campaignKeys } from '@/shared/config';
import type { CampaignCreateInput } from '../api/campaigns.types';

// ============================================
// USE CREATE CAMPAIGN HOOK
// ============================================

/**
 * Hook para crear una nueva campaña con optimistic updates
 * @returns Mutation para crear campaña
 */
export function useCreateCampaign() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CampaignCreateInput) => campaignsAPI.create(data),

        onSuccess: (newCampaign) => {
            // Invalidar cache para refetch automático
            queryClient.invalidateQueries({ queryKey: campaignKeys.lists() });
            queryClient.invalidateQueries({ queryKey: campaignKeys.stats() });

            message.success({
                content: `Campaña "${newCampaign.name}" creada exitosamente`,
                duration: 3,
            });
        },

        onError: (error: any) => {
            console.error('Error creating campaign:', error);

            // El error ya se maneja en el interceptor de Axios
            // Pero podemos agregar lógica adicional aquí si es necesario
        },
    });
}
