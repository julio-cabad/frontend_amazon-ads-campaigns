import { Layout, Typography, Flex, Divider, Row, Col, Select, Input } from 'antd';
import { FiSearch, FiFilter } from 'react-icons/fi';
import { useState } from 'react';
import { StatsCards } from '@/features/campaigns/components/StatsCards';
import { CampaignForm } from '@/features/campaigns/components/CampaignForm';
import { CampaignList } from '@/features/campaigns/components/CampaignList';
import { useCampaigns } from '@/features/campaigns/hooks';
import { CampaignStatus } from '@/features/campaigns/api/campaigns.types';
import { colors } from '@/shared/theme';

// ============================================
// DASHBOARD PAGE
// ============================================

const { Header, Content } = Layout;
const { Title, Text } = Typography;

export function Dashboard() {
    const [statusFilter, setStatusFilter] = useState<CampaignStatus | undefined>();
    const [searchQuery, setSearchQuery] = useState('');

    const { data, isLoading } = useCampaigns({
        filters: {
            status: statusFilter,
            name: searchQuery || undefined,
            ordering: '-created_at',
        },
    });

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header
                style={{
                    background: colors.bgPrimary,
                    padding: '0 24px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    <Title level={3} style={{ margin: 0, color: colors.primary }}>
                        🚀 Amazon Ads Campaigns
                    </Title>
                </div>
            </Header>

            <Content style={{ padding: '24px', background: colors.bgSecondary }}>
                <div style={{ maxWidth: 1400, margin: '0 auto' }}>
                    <Flex vertical gap="large" style={{ width: '100%' }}>
                        {/* Stats Section */}
                        <div>
                            <Title level={4}>Estadísticas</Title>
                            <StatsCards />
                        </div>

                        <Divider />

                        {/* Form Section */}
                        <Row gutter={24}>
                            <Col xs={24} lg={10}>
                                <CampaignForm />
                            </Col>

                            {/* List Section */}
                            <Col xs={24} lg={14}>
                                <div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginBottom: 16,
                                        }}
                                    >
                                        <Title level={4} style={{ margin: 0 }}>
                                            Campañas ({data?.count || 0})
                                        </Title>
                                        <Text type="secondary">
                                            Actualización automática cada 5s
                                        </Text>
                                    </div>

                                    {/* Filters */}
                                    <Flex gap="small" style={{ marginBottom: 16, width: '100%' }} vertical>
                                        <Input
                                            placeholder="Buscar por nombre..."
                                            prefix={<FiSearch />}
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            size="large"
                                            allowClear
                                        />
                                        <Select
                                            placeholder="Filtrar por estado"
                                            style={{ width: '100%' }}
                                            size="large"
                                            allowClear
                                            value={statusFilter}
                                            onChange={setStatusFilter}
                                            suffixIcon={<FiFilter />}
                                            options={[
                                                { label: 'Pendientes', value: CampaignStatus.PENDING },
                                                { label: 'Procesando', value: CampaignStatus.PROCESSING },
                                                { label: 'Activas', value: CampaignStatus.ACTIVE },
                                                { label: 'Fallidas', value: CampaignStatus.FAILED },
                                            ]}
                                        />
                                    </Flex>

                                    <CampaignList campaigns={data?.results || []} loading={isLoading} />
                                </div>
                            </Col>
                        </Row>
                    </Flex>
                </div>
            </Content>
        </Layout>
    );
}
