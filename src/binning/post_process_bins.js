/**
 * post_process_bins() converts the raw bins array into data we can plot
 *
 * @param {number} bin_count
 * @param {number} bin_size
 * @param {number} lower_bound
 * @param {Array} bins
 * @param {Function} [bin_processing_function] Function for more advanced processing
 */
function post_process_bins (bin_count, bin_size, lower_bound, bins, bin_processing_function) {
  for (var i = 0; i < bin_count; i++) {

    // Calculate the center of the bin
    var center = lower_bound + ( (2 * i + 1) / 2 * bin_size);

    // Process the bin, if need be
    if (bin_processing_function) {
      bin_processing_function(bins, i);
    }

    // return data in the same format we receive it
    bins[i] = [center, bins[i]];
  }
}

export default post_process_bins;
