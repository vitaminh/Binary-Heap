// comparator functions
const maxHeapComparisonFunc = (a, b) => a > b;
const minHeapComparisonFunc = (a, b) => a < b;

// Heap Class
class Heap {
  constructor(array, comparisonFunc) {
    this.heap = this.buildHeap(array);
    this.length = this.heap.length;
    this.comparisonFunc = comparisonFunc;
  }

  buildHeap(array) {
    const start = Math.floor((array.length - 2) / 2);
    for (let i = start; i >= 0; i--) {
      this.siftDown(i, array);
    }
    return array;
  }

  siftDown(i, heap) {
    let leftChildIndex = 2 * i + 1;
    while (leftChildIndex < heap.length) {
      const rightChildIndex = 2 * i + 2 < heap.length ? 2 * i + 2 : null;
      const indexToSwap =
        rightChildIndex &&
        this.comparisonFunc(heap[rightChildIndex], heap[leftChildIndex])
          ? rightChildIndex
          : leftChildIndex;
      if (this.comparisonFunc(heap[indexToSwap], heap[i])) {
        this.swap(i, indexToSwap, heap);
        i = indexToSwap;
        leftChildIndex = 2 * i + 1;
      } else {
        break;
      }
    }
  }

  siftUp(i, heap) {
    let current = heap[i];
    while (
      i > 0 &&
      this.comparisonFunc(current, heap[Math.floor((i - 1) / 2)])
    ) {
      const parentIndex = Math.floor((i - 1) / 2);
      this.swap(i, parentIndex, heap);
      current = heap[parentIndex];
      i = parentIndex;
    }
  }

  peek() {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  remove() {
    this.swap(0, this.heap.length - 1, this.heap);
    const result = this.heap.pop();
    this.siftDown(0, this.heap);
    this.length--;
    return result;
  }

  insert(value) {
    this.heap.push(value);
    this.siftUp(this.heap.length - 1, this.heap);
    this.length++;
  }

  swap(i, j, heap) {
    const temp = heap[i];
    heap[i] = heap[j];
    heap[j] = temp;
  }
}