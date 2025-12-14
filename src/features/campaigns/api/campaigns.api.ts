import { apiClient } from '@/shared/config';
import type {
    Campaign,
    CampaignCreateInput,
    CampaignFilters,
    CampaignListItem,
    CampaignStats,
    PaginatedResponse,
} from './campaigns.types';

// ============================================
// CAMPAIGNS API
// ============================================

export const campaignsAPI = {
    /**
     * Obtener lista de campañas con filtros y paginación
     */
    getAll: async (filters?: CampaignFilters): Promise<PaginatedResponse<CampaignListItem>> => {
        const { data } = await apiClient.get<PaginatedResponse<CampaignListItem>>('/campaigns/', {
            params: filters,
        });
        return data;
    },

    /**
     * Crear nueva campaña
     */
    create: async (payload: CampaignCreateInput): Promise<Campaign> => {
        const { data } = await apiClient.post<Campaign>('/campaigns/', payload);
        return data;
    },

    /**
     * Obtener detalle de una campaña específica
     */
    getById: async (id: string): Promise<Campaign> => {
        const { data } = await apiClient.get<Campaign>(`/campaigns/${id}/`);
        return data;
    },

    /**
     * Eliminar campaña (solo si no está sincronizada)
     */
    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/campaigns/${id}/`);
    },

    /**
     * Reintentar sincronización de campaña fallida
     */
    retry: async (id: string): Promise<Campaign> => {
        const { data } = await apiClient.post<Campaign>(`/campaigns/${id}/retry/`);
        return data;
    },

    /**
     * Obtener estadísticas agregadas
     */
    getStats: async (): Promise<CampaignStats> => {
        const { data } = await apiClient.get<CampaignStats>('/campaigns/stats/');
        return data;
    },
};
