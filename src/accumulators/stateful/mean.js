import Accumulator from './accumulator';

/**
 * Mean accumulator
 */

 class Mean extends Accumulator {
   constructor() {
     super();
     this.sum = 0;
     this.count = 0;
   }

   accumulate(value) {
     this.sum += value;
     this.count++;
   }

   valueOf() {
     return this.sum/this.count;
   }
 }

 function generator() {
   return new Mean();
 }

export default generator;
