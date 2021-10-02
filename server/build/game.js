"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const commons_1 = require("commons");
const socket_io_1 = __importDefault(require("socket.io"));
const state = {
    slots: {},
    playerRegistry: {},
    destroyedWalls: []
};
function randomOfList(list) {
    return list[Math.floor(Math.random() * list.length)];
}
function findRandomSlot() {
    const centerXOffset = (commons_1.GameDimensions.tileWidth / 2) - (commons_1.GameDimensions.playerHeight / 2);
    const centerYOffset = (commons_1.GameDimensions.tileHeight / 2) - (commons_1.GameDimensions.playerWidth / 2);
    const availableSlots = [];
    if (!state.slots.first) {
        availableSlots.push({
            slot: 'first',
            x: centerXOffset,
            y: centerYOffset
        });
    }
    if (!state.slots.second) {
        availableSlots.push({
            slot: 'second',
            x: commons_1.GameDimensions.gameWidth - centerXOffset,
            y: centerYOffset
        });
    }
    if (!state.slots.third) {
        availableSlots.push({
            slot: 'third',
            x: centerXOffset,
            y: commons_1.GameDimensions.gameHeight - centerYOffset
        });
    }
    if (!state.slots.fourth) {
        availableSlots.push({
            slot: 'fourth',
            x: commons_1.GameDimensions.gameWidth - centerXOffset,
            y: commons_1.GameDimensions.gameHeight - centerYOffset
        });
    }
    if (availableSlots.length >= 1) {
        return randomOfList(availableSlots);
    }
}
function handleConnection(server, socket) {
    const playerId = socket.id;
    const position = findRandomSlot();
    if (position) {
        const newPlayer = {
            isDead: false,
            slot: position.slot,
            status: {
                bombRange: 2,
                maxBombCount: 1
            },
            directions: {
                down: false,
                left: false,
                right: false,
                up: false,
                ...position
            }
        };
        console.log(`New player ${playerId} joins at x ${newPlayer.directions.x} y ${newPlayer.directions.x} on slot ${[position.slot]}`);
        state.slots[newPlayer.slot] = position;
        state.playerRegistry[playerId] = newPlayer;
        socket.emit("init_with_state" /* InitWithState */, { ...state, id: playerId });
        socket.broadcast.emit("new_player" /* NewPlayer */, { ...newPlayer, id: playerId });
    }
    else {
        socket.emit("init_with_state" /* InitWithState */, { ...state, id: playerId });
    }
    socket.on("movement" /* Movement */, (directions) => {
        const player = state.playerRegistry[playerId];
        if (player && !player.isDead) {
            player.directions = directions;
        }
    });
    socket.on("disconnect" /* Disconnect */, () => {
        const player = state.playerRegistry[playerId];
        if (player) {
            delete state.slots[player.slot];
            delete state.playerRegistry[playerId];
        }
        server.sockets.emit("player_disconnect" /* PlayerDisconnect */, playerId);
    });
    socket.on("new_bomb_at" /* NewBombAt */, (coords) => {
        const player = state.playerRegistry[playerId];
        if (player && !player.isDead) {
            socket.broadcast.emit("new_bomb_at" /* NewBombAt */, {
                ...coords,
                range: player.status.bombRange
            });
        }
    });
    socket.on("wall_destroyed" /* WallDestroyed */, (coordinates) => {
        state.destroyedWalls = state.destroyedWalls.concat(coordinates);
        const rand = Math.random() * 100;
        if (rand <= 10 || rand >= 90) {
            const randomPower = randomOfList(["BombRange", "BombCount"]);
            const newPowerAt = {
                ...coordinates,
                powerUpType: randomPower
            };
            socket.emit("new_power_up" /* NewPowerUpAt */, newPowerAt);
        }
    });
    socket.on("player_died" /* PlayerDied */, (deadPlayerId) => {
        console.log('Player ', deadPlayerId, ' died');
        if (deadPlayerId in state.playerRegistry) {
            state.playerRegistry[deadPlayerId].isDead = true;
        }
        socket.broadcast.emit("player_died" /* PlayerDied */, deadPlayerId);
    });
    socket.on("power_up_collected" /* PowerUpCollected */, (info) => {
        const player = state.playerRegistry[playerId];
        if (player) {
            switch (info.type) {
                case "BombRange":
                    player.status.bombRange++;
                    break;
                case "BombCount":
                    player.status.maxBombCount++;
                    break;
            }
            socket.emit("player_status_updated" /* PlayerStatusUpdate */, {
                id: info.id,
                ...player.status
            });
        }
    });
}
function init(server) {
    const io = socket_io_1.default(server);
    io.on('connection', socket => handleConnection(io, socket));
    setInterval(() => {
        io.sockets.emit("state_change" /* StateUpdate */, state);
    }, commons_1.SERVER_UPDATE_INTERVAL);
}
exports.init = init;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9nYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHFDQVVpQjtBQUNqQiwwREFBcUQ7QUFHckQsTUFBTSxLQUFLLEdBQWlCO0lBQzFCLEtBQUssRUFBRSxFQUFFO0lBQ1QsY0FBYyxFQUFFLEVBQUU7SUFDbEIsY0FBYyxFQUFFLEVBQUU7Q0FDbkIsQ0FBQztBQUlGLFNBQVMsWUFBWSxDQUFJLElBQVM7SUFDaEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDckQsQ0FBQztBQUVELFNBQVMsY0FBYztJQUNyQixNQUFNLGFBQWEsR0FBRyxDQUFDLHdCQUFjLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsd0JBQWMsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDekYsTUFBTSxhQUFhLEdBQUcsQ0FBQyx3QkFBYyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLHdCQUFjLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3pGLE1BQU0sY0FBYyxHQUFrQixFQUFFLENBQUM7SUFFekMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFO1FBQ3RCLGNBQWMsQ0FBQyxJQUFJLENBQUM7WUFDbEIsSUFBSSxFQUFFLE9BQU87WUFDYixDQUFDLEVBQUUsYUFBYTtZQUNoQixDQUFDLEVBQUUsYUFBYTtTQUNqQixDQUFDLENBQUE7S0FDSDtJQUVELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtRQUN2QixjQUFjLENBQUMsSUFBSSxDQUFDO1lBQ2xCLElBQUksRUFBRSxRQUFRO1lBQ2QsQ0FBQyxFQUFFLHdCQUFjLENBQUMsU0FBUyxHQUFHLGFBQWE7WUFD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