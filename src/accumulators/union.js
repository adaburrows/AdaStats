/**
 * union() Pushes a value onto a bin
 * This is used for composing more advanced functionality
 *
 * @param {Array} bins - Array of bins
 * @param {number} bin - Current bin
 * @param {number} value - Value to push onto the current bin
 */
function union (bins, bin, value) {
  bins[bin].push(value);
}

export default union;
