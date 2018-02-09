/**
 * bin_size() calculates the size of a bin
 *
 * @param {number} lower_bound
 * @param {number} upper_bound
 * @param {number} bin_count - the number of bins to create
 * @returns {number} - the size of the resultant bins
 */
function bin_size (lower_bound, upper_bound, bin_count) {
  return Math.ceil(Math.abs(upper_bound - lower_bound) / bin_count);
}

export default bin_size;
