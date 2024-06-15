import { Router } from "express";
import ProfileController from "./profile.controller";
import AuthMiddleware from "../middleware/Auth.middelware";
import ROLE from "../enum/Role";

class ProfileRoutes {
  private routes: Router;

  constructor() {
    this.routes = Router();
    this.initialRoutes();
  }

  private initialRoutes = () => {
    this.routes.get("/", ProfileController.getProfile);
    this.routes.get(
      "/profile",
      new AuthMiddleware([ROLE.ADMIN, ROLE.SOPORTE]).AddGuard,
      ProfileController.getProfile
    );
  };
  public getRouter() {
    return this.routes;
  }
}
export default new ProfileRoutes();
