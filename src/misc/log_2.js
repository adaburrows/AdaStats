/**
 * log_2() returns the base 2 logarithm of a number
 *
 * @param {number} number
 * @returns {number} - base 2 logarithm
 *
 * @example
 * log_2(4); // yields 2, since 2^2 = 4
 */
function log_2 (number) {
  return Math.log(number) / Math.log(2);
}

export default log_2;
