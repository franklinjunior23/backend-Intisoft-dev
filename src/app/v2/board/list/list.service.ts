import BoardEntity from "../entity/board.entity";
import ListEntity from "../entity/List.entity";

class ListService {
  private readonly ListRepository = ListEntity;
  private readonly BoardRepository = BoardEntity;

  public async getLists(): Promise<ListEntity | BoardEntity | null> {
    return await this.BoardRepository.findAll({
        where:
    });
  }
}

export default new ListService();
