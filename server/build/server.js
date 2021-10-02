"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const game_1 = require("./game");
const app = express_1.default();
const server = new http_1.default.Server(app);
const clientPath = '../../client';
app.set('port', 5000);
app.use('/', express_1.default.static(path_1.default.resolve(__dirname, clientPath, 'build')));
app.use('/assets', express_1.default.static(path_1.default.resolve(__dirname, clientPath, 'build/assets')));
// Routing
app.get('/', (_, response) => {
    response.sendFile(path_1.default.resolve(__dirname, clientPath, 'build/index.html'));
});
// Starts the server.
server.listen(5000, () => {
    console.log("Address", server.address());
    console.log('Starting server on port 5000');
});
// Init the game instance
game_1.init(server);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3NlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUE2QjtBQUM3QixnREFBdUI7QUFDdkIsZ0RBQXVCO0FBQ3ZCLGlDQUE4QjtBQUU5QixNQUFNLEdBQUcsR0FBRyxpQkFBTyxFQUFFLENBQUM7QUFDdEIsTUFBTSxNQUFNLEdBQUcsSUFBSSxjQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3BDLE1BQU0sVUFBVSxHQUFHLGNBQWMsQ0FBQztBQUVsQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztBQUV0QixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxpQkFBTyxDQUFDLE1BQU0sQ0FBQyxjQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBRTNFLEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLGlCQUFPLENBQUMsTUFBTSxDQUFDLGNBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFFeEYsVUFBVTtBQUNWLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxFQUFFO0lBQzNCLFFBQVEsQ0FBQyxRQUFRLENBQUMsY0FBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLGtCQUFrQixDQUFDLENBQUMsQ0FBQTtBQUM1RSxDQUFDLENBQUMsQ0FBQztBQUVILHFCQUFxQjtBQUNyQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7SUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDekMsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFBO0FBQzdDLENBQUMsQ0FBQyxDQUFDO0FBRUgseUJBQXlCO0FBQ3pCLFdBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQSJ9