/**
 * Null accumulator
 */

 class Accumulator {
   constructor() {
   }

   accumulate(value) {
     throw new TypeError("Cannot use Null accumulator directly.");
   }

   valueOf() {
     throw new TypeError("Cannot use Null accumulator directly.");
   }
 }

export default Accumulator;
