class Asset {
    constructor(public id: string, public name: string, public value: number) {}
}

interface AssetManagerOptions {
    maxAssets?: number;
}

class AssetManager {
    private assets: Asset[] = [];
    private options: AssetManagerOptions;

    constructor(options?: AssetManagerOptions) {
        this.options = options || {};
    }

    addAsset(asset: Asset): boolean {
        if (this.options.maxAssets && this.assets.length >= this.options.maxAssets) {
            return false; // Cannot add more assets than the limit
        }
        this.assets.push(asset);
        return true;
    }

    removeAsset(assetId: string): boolean {
        const index = this.assets.findIndex(asset => asset.id === assetId);
        if (index !== -1) {
            this.assets.splice(index, 1);
            return true;
        }
        return false; // Asset not found
    }

    getAssets(): Asset[] {
        return this.assets;
    }

    getAssetById(assetId: string): Asset | undefined {
        return this.assets.find(asset => asset.id === assetId);
    }
}

export { Asset, AssetManager, AssetManagerOptions };