import { Card, Col, Row, Statistic, Skeleton } from 'antd';
import { FiZap, FiLoader, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { useCampaignStats } from '../hooks';
import { colors } from '@/shared/theme';

// ============================================
// STATS CARDS COMPONENT
// ============================================

export function StatsCards() {
    const { data: stats, isLoading } = useCampaignStats();

    if (isLoading) {
        return (
            <Row gutter={[16, 16]}>
                {[1, 2, 3, 4].map((i) => (
                    <Col xs={24} sm={12} lg={6} key={i}>
                        <Card>
                            <Skeleton active paragraph={{ rows: 1 }} />
                        </Card>
                    </Col>
                ))}
            </Row>
        );
    }

    const statsConfig = [
        {
            title: 'Total Campañas',
            value: stats?.total || 0,
            icon: <FiZap style={{ color: colors.primary }} />,
            valueStyle: { color: colors.primary },
        },
        {
            title: 'Activas',
            value: stats?.by_status.ACTIVE || 0,
            icon: <FiCheckCircle style={{ color: colors.success }} />,
            valueStyle: { color: colors.success },
        },
        {
            title: 'Procesando',
            value: stats?.by_status.PROCESSING || 0,
            icon: <FiLoader style={{ color: colors.warning }} className="animate-spin" />,
            valueStyle: { color: colors.warning },
        },
        {
            title: 'Fallidas',
            value: stats?.by_status.FAILED || 0,
            icon: <FiXCircle style={{ color: colors.error }} />,
            valueStyle: { color: colors.error },
        },
    ];

    return (
        <Row gutter={[16, 16]}>
            {statsConfig.map((stat, index) => (
                <Col xs={24} sm={12} lg={6} key={index}>
                    <Card variant="borderless" hoverable>
                        <Statistic
                            title={stat.title}
                            value={stat.value}
                            prefix={stat.icon}
                            styles={{ content: stat.valueStyle }}
                        />
                    </Card>
                </Col>
            ))}
        </Row>
    );
}
