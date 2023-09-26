"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const database_1 = require("./app/config/database");
const Login_routes_1 = __importDefault(require("./app/routes/Login.routes"));
const RolesPredet_seed_1 = require("./app/seeds/RolesPredet.seed");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const Swagger_1 = __importDefault(require("./docs/Swagger"));
const app = (0, express_1.default)();
const puerto = process.env.PORT || 3000;
const point_defect = process.env.POINT || '/api/v1';
require("./app/models/Asociaciones");
const Empresas_routes_1 = __importDefault(require("./app/routes/Empresas.routes"));
const Sucursales_routes_1 = __importDefault(require("./app/routes/Sucursales.routes"));
const Users_routes_1 = __importDefault(require("./app/routes/Users.routes"));
const Dispositivo_routes_1 = __importDefault(require("./app/routes/Dispositivo.routes"));
const Informes_routes_1 = __importDefault(require("./app/routes/Informes.routes"));
const Tickets_routes_1 = __importDefault(require("./app/routes/Tickets.routes"));
app.use((0, cors_1.default)({
    origin: '*'
}));
app.use(express_1.default.json());
// documentacion for Swagger Ui
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(Swagger_1.default));
// RouteS
app.use(`${point_defect}/auth/Login`, Login_routes_1.default);
app.use(`${point_defect}/Empresas`, Empresas_routes_1.default);
app.use(`${point_defect}/Sucursales`, Sucursales_routes_1.default);
app.use(`${point_defect}/Users`, Users_routes_1.default);
app.use(`${point_defect}/Dispositivos`, Dispositivo_routes_1.default);
app.use(`${point_defect}/Informes`, Informes_routes_1.default);
app.use(`${point_defect}/Tickets`, Tickets_routes_1.default);
app.listen(puerto, () => __awaiter(void 0, void 0, void 0, function* () {
    (0, RolesPredet_seed_1.Execute_roles)(); // ejecucion de la creacion de los roles por predeterminado
    // force: true 
    // alter: true
    // para tener cambios , actualizacion de la bd /
    yield database_1.sequelize.sync({ alter: true });
    console.log(`http://localhost:${puerto}/api`);
}));
