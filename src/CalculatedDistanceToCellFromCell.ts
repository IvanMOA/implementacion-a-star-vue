import { Cell } from "./Cell";
import { PriorityQueableItem } from "./PriorityQueableItem";
export class CalculatedDistanceToCellFromCell implements PriorityQueableItem {
  readonly distanceBetweenNodes = 2;
  constructor(public toCell: Cell, public pathVia: Cell) {}
  get combinedHeuristic() {
    return this.distanceBetweenNodes + this.toCell.distanceToEnd;
  }
  get priority() {
    return this.combinedHeuristic;
  }
}
