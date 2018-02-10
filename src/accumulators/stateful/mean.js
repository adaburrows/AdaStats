import Accumulator from './accumulator';
import neumaier_sum from './neumaier_sum';

/**
 * Mean accumulator
 */

 class Mean extends Accumulator {
   constructor() {
     super();
     this.sum = neumaier_sum();
     this.count = 0;
   }

   accumulate(value) {
     this.sum.accumulate(value);
     this.count++;
   }

   valueOf() {
     return this.sum.valueOf()/this.count;
   }
 }

 function generator() {
   return new Mean();
 }

export default generator;
