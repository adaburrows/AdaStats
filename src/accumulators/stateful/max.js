import Accumulator from './accumulator';

/**
 * Max accumulator
 */

 class Max extends Accumulator {
   constructor() {
     super();
     this.max = Number.NEGATIVE_INFINITY;
   }

   accumulate(value) {
     if (value >= this.max) {
       this.max = value;
     }
   }

   valueOf() {
     return this.max;
   }
 }

 function generator() {
   return new Max();
 }

export default generator;
