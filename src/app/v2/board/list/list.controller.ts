import { Request, Response } from "express";
import listService from "./list.service";

class ListController {
  private readonly ListService = listService;

  public getLists = async (req: Request, res: Response) => {
    const data = await this.ListService.getLists();

    return res.json(data);
  };
}

export default new ListController();
