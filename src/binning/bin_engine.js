import identity_projector from '../projectors/identity';
import filter_range from '../filters/filter_range';
import bin_count from './bin_count';
import post_process_bins from './post_process_bins';

/**
 * bin_engine() is the main workhorse behind all the data binning along a projection given by the filter_projector
 *
 * @param {Array} data Data set
 * @param {number} lower_bound Lowest x coordinate value to retain
 * @param {number} upper_bound Highest x coordinate value to retain
 * @param {number} bin_size
 * @param {Function} generator Function to initialize bins, corresponds to data_processing_function
 * @param {Function} data_processing_function Either toss_in_bin() or accumulate()
 * @param {Function} [bin_processing_function] Function to process data once in bins, usually used with toss_in_bin()
 * @param {Function} [filter_projector] the image of the projector function is used for filtering
 * @param {Function} [data_projector] the image of the projector function in the codomain of the current bin is accumulated in the bins
 * @returns {Array} Bins of processed data!
 */
function bin_engine (data, lower_bound, upper_bound, bin_size, generator, data_processing_function, bin_processing_function, filter_projector, data_projector) {
  var count = bin_count(lower_bound, upper_bound, bin_size),
      bins     = [],
      filter_getter = identity_projector,
      data_getter = identity_projector,
      i = 0;

  if (filter_projector) {
    filter_getter = filter_projector;
  }

  if (data_projector) {
    data_getter = data_projector;
  }

  // Initialize bins
  for (i = 0; i < count; i++) {
    bins[i] = generator();
  }

  function data_kernel (data, i) {
    // Calculate the floor of the bin
    var bin = Math.floor((filter_getter(data, i) - lower_bound) / bin_size);
    data_processing_function(bins, bin, data_getter(data, i));
  }

  // Sweep through the data using the integer divider of the range to accumulate the data in the proper bin
  filter_range(data, lower_bound, upper_bound, data_kernel, filter_getter);

  post_process_bins(count, bin_size, lower_bound, bins, bin_processing_function);
  return bins;
}

export default bin_engine;
