import { AStarDrawer } from "./AStarDrawer";
import { AStar } from "./AStar";
export class CellConsoleAStarDrawer implements AStarDrawer {
  constructor() {}
  draw(aStar: AStar) {
    console.log(
      aStar.cellsMatrix.map((row, rowIndex) =>
        row.map((cell, columnIndex) => {
          if (
            rowIndex === aStar.startingCellPosition?.rowIndex &&
            columnIndex === aStar.startingCellPosition?.columnIndex
          ) {
            return "S";
          }
          if (
            rowIndex === aStar.endCellPosition?.rowIndex &&
            columnIndex === aStar.endCellPosition?.columnIndex
          ) {
            return "E";
          }
          if (cell.isBlocked) return "▣";
          return "o";
        })
      )
    );
  }
}
