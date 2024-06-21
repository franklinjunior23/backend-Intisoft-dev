import { Request, Response } from "express";
import boardService from "./board.service";

class BoardController {
  private BoardService = boardService;

  public getBoard = async (req: Request, res: Response) => {
    const { all } = req.query;

    let data = null;
    try {
      data = await this.BoardService.getBoards();
      if (!Boolean(all)) data = await this.BoardService.getBoardThisWeek();
      return res.json(data);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };

  public createBoard = async (req: Request, res: Response) => {
    const { name, description } = req.body;

    if (!name || !description) {
      return res
        .status(400)
        .json({ message: "name and description are required" });
    }

    const data = await this.BoardService.createBoard({ name, description });
    return res.json(data);
  };
}
export default new BoardController();
