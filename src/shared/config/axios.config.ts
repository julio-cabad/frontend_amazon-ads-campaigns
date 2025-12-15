import axios, { AxiosError } from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';
import { message as antdMessage } from 'antd';

// ============================================
// AXIOS INSTANCE CONFIGURATION
// ============================================

const API_BASE_URL = import.meta.env.PROD
    ? 'https://backendamazon-ads-campaigns-production.up.railway.app/api'
    : (import.meta.env.VITE_API_URL || '/api');

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// ============================================
// REQUEST INTERCEPTOR
// ============================================

apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Log request en desarrollo
        if (import.meta.env.DEV) {
            console.log(`🚀 [API Request] ${config.method?.toUpperCase()} ${config.url}`, {
                params: config.params,
                data: config.data,
            });
        }

        // Aquí podrías agregar tokens de autenticación en el futuro
        // const token = localStorage.getItem('auth_token');
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }

        return config;
    },
    (error) => {
        console.error('❌ [Request Error]', error);
        return Promise.reject(error);
    }
);

// ============================================
// RESPONSE INTERCEPTOR
// ============================================

apiClient.interceptors.response.use(
    (response) => {
        // Log response en desarrollo
        if (import.meta.env.DEV) {
            console.log(`✅ [API Response] ${response.config.method?.toUpperCase()} ${response.config.url}`, {
                status: response.status,
                data: response.data,
            });
        }

        return response;
    },
    (error: AxiosError) => {
        // Log error
        console.error('❌ [API Error]', {
            url: error.config?.url,
            method: error.config?.method,
            status: error.response?.status,
            data: error.response?.data,
        });

        // Manejo centralizado de errores HTTP
        handleApiError(error);

        return Promise.reject(error);
    }
);

// ============================================
// ERROR HANDLER
// ============================================

function handleApiError(error: AxiosError) {
    const status = error.response?.status;
    const data = error.response?.data as any;

    // Network errors
    if (!error.response) {
        antdMessage.error('Error de conexión. Verifica tu internet.');
        return;
    }

    // HTTP error handling
    switch (status) {
        case 400:
            // Validation errors
            if (data?.error?.message) {
                antdMessage.error(data.error.message);
            } else if (typeof data === 'object') {
                // Mostrar primer error de validación
                const firstError = Object.values(data)[0];
                if (Array.isArray(firstError) && firstError.length > 0) {
                    antdMessage.error(firstError[0] as string);
                }
            } else {
                antdMessage.error('Datos inválidos. Revisa el formulario.');
            }
            break;

        case 404:
            antdMessage.error('Recurso no encontrado.');
            break;

        case 429:
            antdMessage.warning('Demasiadas solicitudes. Intenta más tarde.');
            break;

        case 500:
        case 502:
        case 503:
            antdMessage.error('Error del servidor. Intenta más tarde.');
            break;

        default:
            antdMessage.error('Ocurrió un error inesperado.');
    }
}

// ============================================
// EXPORTS
// ============================================

export default apiClient;
