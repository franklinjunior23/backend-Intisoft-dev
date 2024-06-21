import { Op } from "sequelize";
import BoardEntity from "./entity/board.entity";
import ListEntity from "./entity/List.entity";

class BoardService {
  private readonly BoardRepository = BoardEntity;
  private readonly ListRepository = ListEntity;

  public async getBoardThisWeek(): Promise<BoardEntity[] | null> {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return await this.BoardRepository.findAll({
      where: {
        createdAt: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
      },
      include: [
        {
          model: this.ListRepository,
          as: "lists",
        },
      ],
    });
  }

  public async getBoards(): Promise<BoardEntity[]> {
    return await this.BoardRepository.findAll();
  }

  public async createBoard(data: {
    name: string;
    description: string;
  }): Promise<BoardEntity> {
    return await this.BoardRepository.create(data);
  }
}

export default new BoardService();
