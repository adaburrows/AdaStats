/**
 * bin_count() calculates the number of bins given the bin size and range
 *
 * @param {number} lower_bound
 * @param {number} upper_bound
 * @param {number} bin_size - the size of the bins
 * @returns {number} - the number of resultant bins
 */
function bin_count (lower_bound, upper_bound, bin_size) {
  return Math.ceil(Math.abs(upper_bound - lower_bound) / bin_size);
}

export default bin_count;
