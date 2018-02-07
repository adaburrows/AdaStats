/**
 * summation() Accumulates values in a bin
 * This is used for composing more advanced functionality
 *
 * @param {Array} bins - Array of bins
 * @param {number} bin - Current bin
 * @param {number} value - Value to accumulate in the current bin
 */
function summation (bins, bin, value) {
  bins[bin] += value;
}

export default summation;
