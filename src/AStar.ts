import { AStarDrawer } from "./AStarDrawer";
import { Cell } from "./Cell";
import { PriorityQueue } from "./PriorityQueue";
import { CalculatedDistanceToCellFromCell } from "./CalculatedDistanceToCellFromCell";
import { MatrixPosition } from "./MatrixPosition";
export class AStar {
  cellsMatrix: Cell[][];
  startingCellPosition?: MatrixPosition;
  endCellPosition?: MatrixPosition;
  queue = new PriorityQueue<CalculatedDistanceToCellFromCell>();
  constructor(columns: number, rows: number, public drawer: AStarDrawer) {
    this.cellsMatrix = (
      new Array(rows).fill(new Array(columns).fill(new Cell())) as Cell[][]
    ).map((rows) => rows.map(() => new Cell()));
    this.linkCells();
  }
  calculateIdsToTravel(): number[] {
    this.queue.items = [];
    if (!this.startingCellPosition && !this.endCellPosition)
      throw Error("Select starting and final position");
    let currentExpandingCell = this.startingCell;
    let shouldFinish = false;
    const shiftedCalculatedDistances: CalculatedDistanceToCellFromCell[] = [];
    while (!shouldFinish) {
      for (const neighbor of currentExpandingCell.neighbors) {
        if (!neighbor) continue;
        if (neighbor.isBlocked) continue;
        if (neighbor.id === this.endCell.id) shouldFinish = true;
        const existingCalculatedDistanceToCell = this.queue.items.find(
          (calculatedDistance) => calculatedDistance.toCell.id === neighbor.id
        );
        const calculatedDistanceToCellFromCell =
          new CalculatedDistanceToCellFromCell(neighbor, currentExpandingCell);
        if (!existingCalculatedDistanceToCell) {
          this.queue.enqueue(calculatedDistanceToCellFromCell);
          continue;
        }
        if (
          calculatedDistanceToCellFromCell.combinedHeuristic <
          existingCalculatedDistanceToCell.combinedHeuristic
        ) {
          existingCalculatedDistanceToCell.pathVia = neighbor;
        }
      }
      currentExpandingCell = this.queue.items[0].toCell;
      shiftedCalculatedDistances.push(this.queue.items.shift()!);
    }
    const finalCellCalculatedDistance = this.queue.items.find(
      (cd) => cd.toCell.id === this.endCell.id
    )!;
    const idsToTravel: number[] = [];
    let startFound = false;
    let currentCalculatedDistance = finalCellCalculatedDistance;
    while (!startFound) {
      console.log("infinite loop ?");
      const fromCell = currentCalculatedDistance.pathVia;
      const cd = shiftedCalculatedDistances.find(
        (_cd) => _cd.toCell.id === fromCell.id
      )!;
      if (!cd) continue;
      idsToTravel.push(fromCell.id);
      currentCalculatedDistance = cd;
      if (cd?.pathVia.id === this.startingCell.id) {
        startFound = true;
      }
    }
    return idsToTravel;
  }
  get startingCell() {
    return this.cellsMatrix[this.startingCellPosition?.rowIndex!][
      this.startingCellPosition?.columnIndex!
    ];
  }
  get endCell() {
    return this.cellsMatrix[this.endCellPosition?.rowIndex!][
      this.endCellPosition?.columnIndex!
    ];
  }
  private linkCells() {
    this.cellsMatrix.map((row, rowIndex) =>
      row.map((cell, cellColumnIndex) => {
        cell.upCell = (this.cellsMatrix[rowIndex - 1] ?? [])[cellColumnIndex];
        cell.downCell = (this.cellsMatrix[rowIndex + 1] ?? [])[cellColumnIndex];
        cell.leftCell = (this.cellsMatrix[rowIndex] ?? [])[cellColumnIndex - 1];
        cell.rightCell = (this.cellsMatrix[rowIndex] ?? [])[
          cellColumnIndex + 1
        ];
        return cell;
      })
    );
  }
  calculateHeuristic() {
    for (const [rowIndex, row] of this.cellsMatrix.entries()) {
      for (const [columnIndex, cell] of row.entries()) {
        const triangleBase = Math.abs(
          this.endCellPosition!.columnIndex + 1 - (columnIndex + 1)
        );
        const triangleHeight = Math.abs(
          this.endCellPosition!.rowIndex + 1 - (rowIndex + 1)
        );
        cell.distanceToEnd = Math.sqrt(triangleBase ** 2 + triangleHeight ** 2);
      }
    }
  }
}
