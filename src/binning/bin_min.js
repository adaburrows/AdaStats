import generic_accumulator from '../accumulators/generic';
import min from '../accumulators/stateful/min';
import bin_engine from './bin_engine';

/**
 * bin_min() bins data!
 *
 * @param {Array} data - data set
 * @param {number} lower_bound - lowest coordinate value to retain
 * @param {number} upper_bound - highest coordinate value to retain
 * @param {number} bin_size - size of each bin
 * @param {Function} [binning_projector] - image of the projector function determines the values used for binning
 * @param {Function} [data_projector] - minimum element of the image of the projector function is placed into bin
 * @returns {Array} - bins of arrays of data
 */
function bin_min (data, lower_bound, upper_bound, bin_size, binning_projector, data_projector, bin_processing_function) {
  return bin_engine(data, lower_bound, upper_bound, bin_size, min, generic_accumulator, binning_projector, data_projector, bin_processing_function);
}

export default bin_min;
