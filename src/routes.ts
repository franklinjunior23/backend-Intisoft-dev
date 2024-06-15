import { Router } from "express";
import SystemInfo from "./app/routes/SystemInfo.routes";
import Notify_Routes from "./app/routes/Notification.routes";
import Login from "./app/routes/Login.routes";
import Notifications_Routes from "./app/routes/Notifications/Notifications.routes";
import AreaRoutes from "./app/routes/areas/Area.routes";
import EmpresasRoutes from "./app/routes/Empresas.routes";
import Sucursales_endpoint from "./app/routes/Sucursales.routes";
import UserRoutes from "./app/routes/Users.routes";
import DispostivoRoutes from "./app/routes/Dispositivo.routes";
import informesRoutes from "./app/routes/Informes.routes";
import TicketsRoutes from "./app/routes/Tickets.routes";
import BaseConocimientos from "./app/routes/BaseConocimientos.routes";
import "dotenv/config";
import HistoryRoutes from "./app/routes/History.routes";
import ProfileRoutes from "./app/profile/profile.route";

const RoutesExpress: Router = Router();
const point_defect = process.env.POINT || "/api/v1";
RoutesExpress.use(`${point_defect}/auth/Login`, Login);
RoutesExpress.use(`${point_defect}/Empresas`, EmpresasRoutes);
RoutesExpress.use(`${point_defect}/Sucursales`, Sucursales_endpoint);
RoutesExpress.use(`${point_defect}/Users`, UserRoutes);
RoutesExpress.use(`${point_defect}/Dispositivos`, DispostivoRoutes);
RoutesExpress.use(`${point_defect}/Informes`, informesRoutes);
RoutesExpress.use(`${point_defect}/Tickets`, TicketsRoutes);
RoutesExpress.use(`${point_defect}/BaseConocimiento`, BaseConocimientos);
RoutesExpress.use(`${point_defect}/Notification`, Notify_Routes);
RoutesExpress.use(`${point_defect}/SystemApi`, SystemInfo);
RoutesExpress.use(`${point_defect}/Notifications`, Notifications_Routes);
RoutesExpress.use(`${point_defect}/Areas`, AreaRoutes);
RoutesExpress.use(`${point_defect}/history-device`, HistoryRoutes);
RoutesExpress.use(`${point_defect}/auth`, ProfileRoutes.getRouter());

RoutesExpress.use((req, res) => {
  res.status(404).json({
    response: "404",
    message: "Not Found",
  });
});

export default RoutesExpress;
