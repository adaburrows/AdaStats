import Accumulator from './accumulator';

/**
 * Sum accumulator
 */

 class Sum extends Accumulator {
   constructor() {
     super();
     this.sum = 0;
   }

   accumulate(value) {
     this.sum += value;
   }

   valueOf() {
     return this.sum;
   }
 }

 function generator() {
   return new Sum();
 }

export default generator;
