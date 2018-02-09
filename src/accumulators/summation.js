/**
 * summation() Accumulates values in a bin
 * This is used for composing more advanced functionality
 *
 * @param {Array} bins - array of bins
 * @param {number} bin - current bin
 * @param {number} value - value to accumulate in the current bin
 */
function summation (bins, bin, value) {
  bins[bin] += value;
}

export default summation;
