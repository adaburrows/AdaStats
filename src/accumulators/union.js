/**
 * union() Pushes a value onto a bin
 * This is used for composing more advanced functionality
 *
 * @param {Array} bins - array of bins
 * @param {number} bin - current bin
 * @param {number} value - value to push onto the current bin
 */
function union (bins, bin, value) {
  bins[bin].push(value);
}

export default union;
