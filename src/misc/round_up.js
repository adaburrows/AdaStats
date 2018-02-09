/**
 * round_up() Rounds a number up to to nearest mulitple of nearest_unit
 *
 * @since 1.0.0
 * @param {number} number - number to round up
 * @param {number} nearest_unit - power of ten to round to
 * @returns {number} - number rounded up
 *
 * @example
 * round_down(1234567, 100); // yields 1234500
 */
function round_up (number, nearest_unit) {
  return Math.ceil(number/nearest_unit) * nearest_unit;
}

export default round_up;
