import Accumulator from './accumulator';

/**
 * Min accumulator
 */

 class Min extends Accumulator {
   constructor() {
     super();
     this.min = Number.POSITIVE_INFINITY;
   }

   accumulate(value) {
     if (value <= this.min) {
       this.min = value;
     }
   }

   valueOf() {
     return this.min;
   }
 }

 function generator() {
   return new Min();
 }

export default generator;
