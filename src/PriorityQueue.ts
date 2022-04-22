import { PriorityQueableItem } from "./PriorityQueableItem";
export class PriorityQueue<T extends PriorityQueableItem> {
  items: T[] = [];
  enqueue(item: T): void {
    this.items.push(item);
  }
  dequeue(): void {
    this.items.shift();
  }
  private sort(): void {
    this.items = this.items.sort((a, b) => {
      if (a.priority < b.priority) return -1;
      if (a.priority > b.priority) return 1;
      return 0;
    });
  }
}
