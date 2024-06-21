import { Router } from "express";
import boardController from "./board.controller";
import listController from "./list/list.controller";

class BoardRoutes {
  private routes: Router;

  constructor() {
    this.routes = Router();
    this.initialRoutes();
  }

  private initialRoutes = () => {
    this.GetRoutes();
    this.PostRoutes();
  };

  private GetRoutes = () => {
    this.routes.get("/", boardController.getBoard);
    this.routes.get("/lists", listController.getLists);
  };
  private PostRoutes = () => {
    this.routes.post("/", boardController.createBoard);
  }

  public getRouter() {
    return this.routes;
  }
}

export default new BoardRoutes();
