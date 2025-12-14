import { Card, Tag, Flex, Typography, Tooltip, Button, Empty } from 'antd';
import {
    FiDollarSign,
    FiTag,
    FiCalendar,
    FiTrash2,
    FiRefreshCw,
    FiInfo,
} from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { CampaignStatusBadge } from './CampaignStatusBadge';
import { useDeleteCampaign, useRetryCampaign } from '../hooks';
import { colors } from '@/shared/theme';
import type { CampaignListItem, CampaignStatus } from '../api/campaigns.types';

// ============================================
// CAMPAIGN CARD COMPONENT
// ============================================

const { Text, Title } = Typography;

interface CampaignCardProps {
    campaign: CampaignListItem;
}

export function CampaignCard({ campaign }: CampaignCardProps) {
    const { deleteWithConfirmation, isPending: isDeleting } = useDeleteCampaign();
    const { mutate: retryCampaign, isPending: isRetrying } = useRetryCampaign();

    const canRetry = campaign.status === 'FAILED';

    const handleDelete = () => {
        deleteWithConfirmation(campaign.id, campaign.name);
    };

    const handleRetry = () => {
        retryCampaign(campaign.id);
    };

    return (
        <Card
            hoverable
            variant="outlined"
            style={{ height: '100%' }}
            actions={[
                canRetry && (
                    <Tooltip title="Reintentar sincronización">
                        <Button
                            type="text"
                            icon={<FiRefreshCw />}
                            loading={isRetrying}
                            onClick={handleRetry}
                        >
                            Reintentar
                        </Button>
                    </Tooltip>
                ),
                <Tooltip title="Eliminar campaña">
                    <Button
                        type="text"
                        danger
                        icon={<FiTrash2 />}
                        loading={isDeleting}
                        onClick={handleDelete}
                    >
                        Eliminar
                    </Button>
                </Tooltip>,
            ].filter(Boolean)}
        >
            <Flex vertical gap="middle" style={{ width: '100%' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Title level={4} style={{ margin: 0 }}>
                        {campaign.name}
                    </Title>
                    <CampaignStatusBadge
                        status={campaign.status as CampaignStatus}
                        statusDisplay={campaign.status_display}
                    />
                </div>

                {/* Budget */}
                <div>
                    <Text type="secondary">
                        <FiDollarSign style={{ marginRight: 4 }} /> Presupuesto:{' '}
                    </Text>
                    <Text strong style={{ fontSize: '18px', color: colors.success }}>
                        ${parseFloat(campaign.budget).toLocaleString('es-ES', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                    </Text>
                </div>

                {/* Keywords */}
                <div>
                    <Text type="secondary">
                        <FiTag style={{ marginRight: 4 }} /> Keywords:
                    </Text>
                    <div style={{ marginTop: 8 }}>
                        <Flex gap="small" wrap="wrap">
                            {campaign.keywords.map((keyword) => (
                                <Tag key={keyword} color="blue">
                                    {keyword}
                                </Tag>
                            ))}
                        </Flex>
                    </div>
                </div>

                {/* External ID */}
                {campaign.external_id && (
                    <div>
                        <Text type="secondary">
                            <FiInfo style={{ marginRight: 4 }} /> ID Externo:{' '}
                        </Text>
                        <Text code>{campaign.external_id}</Text>
                    </div>
                )}

                {/* Created At */}
                <div>
                    <Text type="secondary">
                        <FiCalendar style={{ marginRight: 4 }} /> Creada{' '}
                        {formatDistanceToNow(new Date(campaign.created_at), {
                            addSuffix: true,
                            locale: es,
                        })}
                    </Text>
                </div>
            </Flex>
        </Card>
    );
}

// ============================================
// CAMPAIGN LIST COMPONENT
// ============================================

interface CampaignListProps {
    campaigns: CampaignListItem[];
    loading?: boolean;
}

export function CampaignList({ campaigns, loading }: CampaignListProps) {
    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '40px' }}>
                <Text type="secondary">Cargando campañas...</Text>
            </div>
        );
    }

    if (!campaigns || campaigns.length === 0) {
        return (
            <Empty
                description="No hay campañas creadas"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
        );
    }

    return (
        <Flex vertical gap="large" style={{ width: '100%' }}>
            {campaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
        </Flex>
    );
}
