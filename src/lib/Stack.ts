export class Stack<T> {
  private elements: Array<T>;

  constructor(element?: T) {
    this.elements = element ? [element] : [];
  }

  get length(): number {
    return this.elements.length;
  }

  get isEmpty(): boolean {
    return this.length === 0;
  }

  get isNotEmpty(): boolean {
    return !this.isEmpty;
  }

  init(element: T): void {
    this.elements = [element];
  }

  clear(): void {
    this.elements = [];
  }

  push(element: T): number {
    return this.elements.push(element);
  }

  pop(): T | undefined {
    return this.elements.pop();
  }

  peek(): T | undefined {
    return this.isNotEmpty ? this.elements[this.length - 1] : undefined;
  }
}
