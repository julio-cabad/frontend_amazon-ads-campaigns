import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message, Modal } from 'antd';
import { FiAlertCircle } from 'react-icons/fi';
import { campaignsAPI } from '../api/campaigns.api';
import { campaignKeys } from '@/shared/config';

// ============================================
// USE DELETE CAMPAIGN HOOK
// ============================================

/**
 * Hook para eliminar una campaña con confirmación
 * @returns Mutation para eliminar campaña
 */
export function useDeleteCampaign() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (id: string) => campaignsAPI.delete(id),

        onSuccess: (_, deletedId) => {
            // Invalidar cache
            queryClient.invalidateQueries({ queryKey: campaignKeys.lists() });
            queryClient.invalidateQueries({ queryKey: campaignKeys.stats() });

            // Remover del cache de detalle
            queryClient.removeQueries({ queryKey: campaignKeys.detail(deletedId) });

            message.success('Campaña eliminada exitosamente');
        },

        onError: (error: any) => {
            console.error('Error deleting campaign:', error);
        },
    });

    /**
     * Eliminar campaña con modal de confirmación
     */
    const deleteWithConfirmation = (id: string, campaignName: string) => {
        Modal.confirm({
            title: '¿Eliminar campaña?',
            icon: <FiAlertCircle style={{ color: '#faad14', fontSize: 22 }} />,
            content: `¿Estás seguro de eliminar la campaña "${campaignName}"? Esta acción no se puede deshacer.`,
            okText: 'Eliminar',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk: () => mutation.mutate(id),
        });
    };

    return {
        ...mutation,
        deleteWithConfirmation,
    };
}
