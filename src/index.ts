import { AStar } from "./AStar";
import { CellConsoleAStarDrawer } from "./CellConsoleAStarDrawer";
const aStar = new AStar(5, 5, new CellConsoleAStarDrawer());
aStar.startingCellPosition = {
  rowIndex: 1,
  columnIndex: 1,
};
aStar.cellsMatrix[3][0].isBlocked = true;
aStar.cellsMatrix[3][1].isBlocked = true;
aStar.cellsMatrix[3][2].isBlocked = true;
aStar.cellsMatrix[3][3].isBlocked = true;
aStar.endCellPosition = {
  rowIndex: 4,
  columnIndex: 0,
};
aStar.drawer.draw(aStar);
aStar.calculateHeuristic();
