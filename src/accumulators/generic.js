/**
 * generic_accumulator() generic accumulator adapter for binning
 * This is used for composing more advanced functionality
 *
 * @param {Array} bins - array of bins
 * @param {number} bin - current bin
 * @param {number} value - value to accumulate in the current bin
 */
function generic_accumulator (bins, bin, value) {
  bins[bin].accumulate(value);
}

export default generic_accumulator;
