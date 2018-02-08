/**
 * max() Accumulates maximum values in a bin
 * This is used for composing more advanced functionality
 *
 * @param {Array} bins - Array of bins
 * @param {number} bin - Current bin
 * @param {number} value - Value to accumulate in the current bin
 */
function max (bins, bin, value) {
  if (value >= (bins[bin] ? bins[bin] : value)) {
    bins[bin] = value;
  }
}

export default max;
