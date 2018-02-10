import Accumulator from './accumulator';
import NeumaierSum from './neumaier_sum';

/**
 * Mean accumulator
 */

 class Mean extends NeumaierSum {
   constructor() {
     super();
     this.count = 0;
   }

   accumulate(value) {
     super.accumulate(value);
     this.count++;
   }

   valueOf() {
     return super.valueOf()/this.count;
   }

   static generator() {
     return new Mean();
   }
 }

export default Mean;
