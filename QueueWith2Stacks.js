//Implement a queue with 2 stacks. Your queue should have an enqueue
//and a dequeue function and it should be "first in first out" (FIFO).
function Queue(){
this.stack1 = new Stack();
this.stack2 = new Stack();
}

Queue.prototype.enqueue = function(){
  this.stack1.push(item);
}

Queue.prototype.dequeue = function(){
  if(this.stack2.isEmpty()){
  //move items from stack1 to stack2
  while(!this.stack1.isEmpty()) {
      let item = stack1.pop();
      this.stack2.push(item);
    }
  }

  return this.stack2.pop(); //pop returns an item

}
