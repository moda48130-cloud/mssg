export interface Asset {
    id: string;
    name: string;
    description?: string;
    value: number;
}

export interface AssetManagerOptions {
    maxAssets?: number;
    allowDuplicates?: boolean;
}