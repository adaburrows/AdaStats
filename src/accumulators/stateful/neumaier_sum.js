import Accumulator from './accumulator';

/**
 * Neumaier Sum accumulator
 */

 class NeumaierSum extends Accumulator {
   constructor() {
     super();
     this.sum = 0;
     this.correction = 0; // correction for lost low-order bits in floating point number
   }

   accumulate(value) {

     // compute the sum in a temporary variable
     var t = this.sum + value;

     // if this.sum is bigger, correct for lost bits in value -- else correct for lost bits in sum
     if (Math.abs(this.sum) >= Math.abs(value)) {
       this.correction += (this.sum - t) + value;
     } else {
       this.correction += (value - t) + this.sum;
     }
     this.sum = t;
   }

   valueOf() {
     return this.sum + this.correction; // only apply the correction at the end of the sum
   }
 }

 function generator() {
   return new NeumaierSum();
 }

export default generator;
