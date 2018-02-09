import identity_projector from '../projectors/identity';
import filter_range from '../filters/filter_range';
import bin_count from './bin_count';
import post_process_bins from './post_process_bins';

/**
 * bin_engine() is the main workhorse behind all the data binning along a projection given by the filter_projector
 *
 * @param {Array} data - data set
 * @param {number} lower_bound - lowest value to retain in the image of the projector function over the codomain
 * @param {number} upper_bound - highest value to retain in the image of the projector function over the codomain
 * @param {number} bin_size - size of the bin
 * @param {Function} generator - function to initialize bins, corresponds to data_processing_function
 * @param {Function} data_processing_function - some function which processes data, like union or summation
 * @param {Function} [filter_projector] - the image of the projector function is used for filtering
 * @param {Function} [data_projector] - the image of the projector function is accumulated in the bins
 * @param {Function} [bin_processing_function] - function to process data once in bins, usually used with union accumulator
 * @returns {Array} - bins of processed data!
 */
function bin_engine (data, lower_bound, upper_bound, bin_size, generator, data_processing_function, filter_projector, data_projector, bin_processing_function) {
  var filter_getter = filter_projector ? filter_projector : identity_projector;
  var data_getter = data_projector ? data_projector : identity_projector;
  var count = bin_count(lower_bound, upper_bound, bin_size);
  var bins = [];
  var i = 0;

  // initialize bins
  for (i = 0; i < count; i++) {
    bins[i] = generator();
  }

  function data_kernel (data, i) {

    // calculate the floor of the bin
    var bin = Math.floor((filter_getter(data, i) - lower_bound) / bin_size);

    // apply data processing function to the current bin
    data_processing_function(bins, bin, data_getter(data, i));
  }

  // sweep through the data using the integer divider of the range to accumulate the data in the proper bin
  filter_range(data, lower_bound, upper_bound, data_kernel, filter_getter);

  // apply any post processing -- needed for current implementation of mean, variance, and deviation
  post_process_bins(count, bin_size, lower_bound, bins, bin_processing_function);

  return bins;
}

export default bin_engine;
