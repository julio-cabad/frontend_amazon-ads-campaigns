import type { ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ConfigProvider, App as AntdApp, theme } from 'antd';
import esES from 'antd/locale/es_ES';
import { queryClient } from '@/shared/config';
import { antdTheme } from '@/shared/theme';

// ============================================
// APP PROVIDERS
// ============================================

interface AppProvidersProps {
    children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <ConfigProvider
                locale={esES}
                theme={{
                    ...antdTheme,
                    algorithm: theme.defaultAlgorithm,
                }}
            >
                <AntdApp>
                    {children}
                    {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
                </AntdApp>
            </ConfigProvider>
        </QueryClientProvider>
    );
}
