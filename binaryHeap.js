// comparator functions

// A binary heap can be either a max heap or a minimum heap;
// by using one the following comparator functions, you can decide
// which one you want it to be
const maxHeapComparisonFunc = (a, b) => a > b;
const minHeapComparisonFunc = (a, b) => a < b;

// Heap Class
class Heap {
  constructor(array, comparisonFunc) {
    // array that represents the heap
    this.heap = this.buildHeap(array);
    this.length = this.heap.length;
    // one of the two functions defined on lines 6 & 7
    // that define what takes priority in this heap
    this.comparisonFunc = comparisonFunc;
  }

  buildHeap(array) {
    // start with the lowest node that has at least one child node
    const start = Math.floor((array.length - 2) / 2);
    // percolate that node down, then work your way back up the array
    for (let i = start; i >= 0; i--) {
      this.siftDown(i, array);
    }
    return array;
  }

  siftDown(i, heap) {
    let leftChildIndex = 2 * i + 1;
    // while the index of the left child falls within the bounds of the heap
    while (leftChildIndex < heap.length) {
      // check if a right child node exists
      const rightChildIndex = 2 * i + 2 < heap.length ? 2 * i + 2 : null;
      // if there is a right child, see which of the child nodes has priority
      const indexToSwap =
        rightChildIndex &&
        this.comparisonFunc(heap[rightChildIndex], heap[leftChildIndex])
          ? rightChildIndex
          : leftChildIndex;
      // determine whether the parent or the child node has priority
      if (this.comparisonFunc(heap[indexToSwap], heap[i])) {
        this.swap(i, indexToSwap, heap);
        i = indexToSwap;
        leftChildIndex = 2 * i + 1;
      } else {
        break;
      }
    }
  }

  // similar to sift down, but here we only compare the child and its parent
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
    // swap the first element with the last
    this.swap(0, this.heap.length - 1, this.heap);
    // remove the new last element from the heap
    const result = this.heap.pop();
    // sift down the new first element until it reaches its proper place
    this.siftDown(0, this.heap);
    this.length--;
    return result;
  }

  insert(value) {
    // add the new value to the end of the heap
    this.heap.push(value);
    // sift up until it reaches its proper location
    this.siftUp(this.heap.length - 1, this.heap);
    this.length++;
  }

  // helper function that swaps nodes
  swap(i, j, heap) {
    const temp = heap[i];
    heap[i] = heap[j];
    heap[j] = temp;
  }
}
