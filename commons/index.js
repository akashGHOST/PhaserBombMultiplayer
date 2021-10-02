"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameDimensions = exports.CLIENT_UPDATE_INTERVAL = exports.SERVER_UPDATE_INTERVAL = void 0;
exports.SERVER_UPDATE_INTERVAL = 1000 / 60;
exports.CLIENT_UPDATE_INTERVAL = 1000 / 60;
const tileWidth = 36;
exports.GameDimensions = {
    gameWidth: 540,
    gameHeight: 540,
    playerWidth: 32,
    playerHeight: 48,
    tileWidth: tileWidth,
    tileHeight: 36,
    playerBoxRadius: tileWidth / 4
};
//# sourceMappingURL=index.js.map