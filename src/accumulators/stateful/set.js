import Accumulator from './accumulator';

/**
 * Set accumulator
 */

 class Set extends Accumulator {
   constructor() {
     super();
     this.set = [];
   }

   accumulate(value) {
     this.set.push(value);
   }

   valueOf() {
     return this.set;
   }
 }

 function generator() {
   return new Set();
 }

export default generator;
