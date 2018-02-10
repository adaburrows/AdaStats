import generic_accumulator from '../accumulators/generic';
import mean from '../accumulators/stateful/mean';
import bin_engine from './bin_engine';

/**
 * bin_mean() calculates the mean within each bin of data
 *
 * @param {Array} data - data set
 * @param {number} lower_bound - lowest coordinate value to retain
 * @param {number} upper_bound - highest coordinate value to retain
 * @param {number} bin_size - size of each bin
 * @param {Function} [binning_projector] - image of the projector function determines the values used for binning
 * @param {Function} [data_projector] - image of projector function is placed into bin
 * @returns {Array} - bins of arrays of data
 */
function bin_mean (data, lower_bound, upper_bound, bin_size, binning_projector, data_projector, bin_processing_function) {
  return bin_engine(data, lower_bound, upper_bound, bin_size, mean, generic_accumulator, binning_projector, data_projector);
}

export default bin_mean;
