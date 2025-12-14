import { Form, Input, InputNumber, Button, Card } from 'antd';
import { FiZap, FiDollarSign } from 'react-icons/fi';
import { useCreateCampaign } from '../hooks';
import type { CampaignCreateInput } from '../api/campaigns.types';

// ============================================
// CAMPAIGN FORM COMPONENT
// ============================================

interface CampaignFormProps {
    onSuccess?: () => void;
}

export function CampaignForm({ onSuccess }: CampaignFormProps) {
    const [form] = Form.useForm();
    const { mutate: createCampaign, isPending } = useCreateCampaign();

    const handleSubmit = (values: CampaignCreateInput) => {
        createCampaign(values, {
            onSuccess: () => {
                form.resetFields();
                onSuccess?.();
            },
        });
    };

    return (
        <Card title="Crear Nueva Campaña" variant="borderless">
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                autoComplete="off"
            >
                <Form.Item
                    label="Nombre de la Campaña"
                    name="name"
                    rules={[
                        { required: true, message: 'Por favor ingresa el nombre de la campaña' },
                        { min: 3, message: 'El nombre debe tener al menos 3 caracteres' },
                        { max: 255, message: 'El nombre no puede exceder 255 caracteres' },
                    ]}
                >
                    <Input
                        prefix={<FiZap />}
                        placeholder="Ej: Black Friday 2024"
                        size="large"
                    />
                </Form.Item>

                <Form.Item
                    label="Presupuesto (USD)"
                    name="budget"
                    rules={[
                        { required: true, message: 'Por favor ingresa el presupuesto' },
                        { type: 'number', min: 0.01, message: 'El presupuesto debe ser mayor a 0' },
                    ]}
                >
                    <InputNumber
                        prefix={<FiDollarSign />}
                        placeholder="1000.00"
                        size="large"
                        style={{ width: '100%' }}
                        min={0.01}
                        step={0.01}
                        precision={2}
                    />
                </Form.Item>

                <Form.Item
                    label="Keywords"
                    name="keywords"
                    rules={[
                        { required: true, message: 'Por favor ingresa al menos una keyword' },
                    ]}
                    tooltip="Separa las keywords con comas"
                >
                    <Input.TextArea
                        placeholder="zapatos, deportivos, nike, running"
                        rows={3}
                        size="large"
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isPending}
                        size="large"
                        block
                        icon={<FiZap />}
                    >
                        {isPending ? 'Creando Campaña...' : 'Crear Campaña'}
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}
