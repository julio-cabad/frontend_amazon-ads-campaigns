// ============================================
// CAMPAIGN TYPES
// ============================================

export enum CampaignStatus {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    ACTIVE = 'ACTIVE',
    FAILED = 'FAILED',
}

export interface Campaign {
    id: string;
    name: string;
    budget: string;
    keywords: string[];
    status: CampaignStatus;
    status_display: string;
    external_id: string | null;
    has_external_id: boolean;
    is_synced: boolean;
    error_message: string | null;
    retry_count: number;
    synced_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface CampaignListItem {
    id: string;
    name: string;
    budget: string;
    keywords: string[];
    status: CampaignStatus;
    status_display: string;
    external_id: string | null;
    has_external_id: boolean;
    created_at: string;
}

export interface CampaignCreateInput {
    name: string;
    budget: string | number;
    keywords: string[] | string;
}

// ============================================
// PAGINATION & FILTERS
// ============================================

export interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

export interface CampaignFilters {
    status?: CampaignStatus;
    name?: string;
    has_external_id?: boolean;
    page?: number;
    page_size?: number;
    ordering?: string;
    [key: string]: unknown; // Index signature para compatibilidad con Record<string, unknown>
}

// ============================================
// STATISTICS
// ============================================

export interface CampaignStats {
    total: number;
    by_status: Partial<Record<CampaignStatus, number>>;
}

// ============================================
// ERROR HANDLING
// ============================================

export interface ApiError {
    error?: {
        code: string;
        message: string;
    };
    [key: string]: unknown;
}

export interface ValidationError {
    [field: string]: string[];
}
