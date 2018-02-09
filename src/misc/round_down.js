/**
 * round_down() Rounds a number down to to nearest mulitple of nearest_unit
 *
 * @since 1.0.0
 * @param {number} number - number to round down
 * @param {number} nearest_unit - power of ten to round to
 * @returns {number} - number rounded down
 *
 * @example
 * round_down(1234567, 100); // yields 1234500
 */
function round_down (number, nearest_unit) {
  return Math.floor(number/nearest_unit) * nearest_unit;
}

export default round_down;
