"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyToAssetsFolder = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
const path_1 = require("../path");
const path = require('path');
const fs = require('fs');
const assetsCssImport = './assets';
const assetsFolder = './dist/assets';
exports.copyToAssetsFolder = (assetPath) => {
    const sourceDir = path.dirname(assetPath);
    // Note: Some assets, like fonts, have weird "query-like" parameters.
    // They need to be kept in the css, but cannot be used to copy files.
    const originalAssetName = path.basename(assetPath);
    const assetName = originalAssetName.split('?')[0].split('#')[0];
    // Note: This is resolved from the project being bundled base path.
    const directoryPath = path_1.resolvePath(assetsFolder);
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
    }
    fs.copyFileSync(path.join(sourceDir, assetName), path.join(directoryPath, assetName.toLowerCase()));
    // This is the path that will be used in the css to refer to the new asset.
    return path
        .normalize(path.join(assetsCssImport, originalAssetName.toLowerCase()))
        .replace(/\\/g, '/');
};
