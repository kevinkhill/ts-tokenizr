export class Stack<T> {
  static init<T>(element: T): Stack<T> {
    const stack = new Stack<T>();

    stack.push(element);

    return stack;
  }

  protected elements: Array<T> = [];

  get length(): number {
    return this.elements.length;
  }

  get isEmpty(): boolean {
    return this.length === 0;
  }

  get isNotEmpty(): boolean {
    return !this.isEmpty;
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
