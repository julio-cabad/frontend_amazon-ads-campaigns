// ============================================
// THEME CONFIGURATION
// Centralized design tokens for the application
// ============================================

/**
 * Paleta de colores centralizada
 * Todos los componentes deben usar estos tokens
 */
export const colors = {
    // Primary colors
    primary: '#1890ff',
    primaryHover: '#40a9ff',
    primaryActive: '#096dd9',

    // Semantic colors
    success: '#52c41a',
    successHover: '#73d13d',
    successActive: '#389e0d',

    warning: '#faad14',
    warningHover: '#ffc53d',
    warningActive: '#d48806',

    error: '#ff4d4f',
    errorHover: '#ff7875',
    errorActive: '#d9363e',

    // Neutral colors
    textPrimary: 'rgba(0, 0, 0, 0.88)',
    textSecondary: 'rgba(0, 0, 0, 0.65)',
    textDisabled: 'rgba(0, 0, 0, 0.25)',

    // Backgrounds
    bgPrimary: '#ffffff',
    bgSecondary: '#f0f2f5',
    bgElevated: '#ffffff',

    // Borders
    border: '#d9d9d9',
    borderLight: '#f0f0f0',
} as const;

/**
 * Configuración del tema para Ant Design
 */
export const antdTheme = {
    token: {
        colorPrimary: colors.primary,
        colorSuccess: colors.success,
        colorWarning: colors.warning,
        colorError: colors.error,
        colorBgLayout: colors.bgSecondary,
        borderRadius: 8,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    },
    components: {
        Card: {
            borderRadiusLG: 12,
        },
        Button: {
            borderRadius: 8,
        },
        Input: {
            borderRadius: 8,
        },
    },
};

/**
 * Espaciado consistente
 */
export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
} as const;

/**
 * Sombras
 */
export const shadows = {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 2px 8px rgba(0, 0, 0, 0.08)',
    lg: '0 8px 24px rgba(0, 0, 0, 0.12)',
} as const;

// Default export for convenience
const theme = {
    colors,
    antdTheme,
    spacing,
    shadows,
};

export default theme;
