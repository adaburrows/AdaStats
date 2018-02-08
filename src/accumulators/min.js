/**
 * min() Accumulates minimum values in a bin
 * This is used for composing more advanced functionality
 *
 * @param {Array} bins - Array of bins
 * @param {number} bin - Current bin
 * @param {number} value - Value to accumulate in the current bin
 */
function min (bins, bin, value) {
  if (value <= (bins[bin] ? bins[bin] : value)) {
    bins[bin] = value;
  }
}

export default min;
