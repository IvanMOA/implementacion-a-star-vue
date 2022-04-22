let idSeq = 0;
export class Cell {
  id: number;
  isBlocked = false;
  distanceToEnd = Infinity;
  upCell?: Cell;
  downCell?: Cell;
  leftCell?: Cell;
  rightCell?: Cell;
  constructor() {
    this.id = idSeq++;
  }
  get neighbors(): (Cell | undefined)[] {
    return [this.upCell, this.downCell, this.leftCell, this.rightCell];
  }
}
