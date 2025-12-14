import { Tag } from 'antd';
import { FiClock, FiLoader, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { CampaignStatus } from '../api/campaigns.types';

// ============================================
// CAMPAIGN STATUS BADGE
// ============================================

interface CampaignStatusBadgeProps {
    status: CampaignStatus;
    statusDisplay?: string;
}

const STATUS_CONFIG = {
    [CampaignStatus.PENDING]: {
        color: 'default',
        icon: <FiClock />,
        text: 'Pendiente',
    },
    [CampaignStatus.PROCESSING]: {
        color: 'processing',
        icon: <FiLoader className="animate-spin" />,
        text: 'Procesando',
    },
    [CampaignStatus.ACTIVE]: {
        color: 'success',
        icon: <FiCheckCircle />,
        text: 'Activa',
    },
    [CampaignStatus.FAILED]: {
        color: 'error',
        icon: <FiXCircle />,
        text: 'Fallida',
    },
} as const;

export function CampaignStatusBadge({ status, statusDisplay }: CampaignStatusBadgeProps) {
    const config = STATUS_CONFIG[status];

    return (
        <Tag color={config.color} icon={config.icon}>
            {statusDisplay || config.text}
        </Tag>
    );
}
