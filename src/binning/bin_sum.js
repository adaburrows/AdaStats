import generic_accumulator from '../accumulators/generic';
import Sum from '../accumulators/stateful/neumaier_sum';
import bin_engine from './bin_engine';

/**
 * bin_sum() bins data!
 *
 * @param {Array} data - data set
 * @param {number} lower_bound - lowest coordinate value to retain
 * @param {number} upper_bound - highest coordinate value to retain
 * @param {number} bin_size - size of each bin
 * @param {Function} [binning_projector] - image of the projector function determines the values used for binning
 * @param {Function} [data_projector] - image of projector function is summed into a bin
 * @param {Function} [bin_processing_function] - function which does post processing on bins
 * @returns {Array} - bins of arrays of data
 */
function bin_sum (data, lower_bound, upper_bound, bin_size, binning_projector, data_projector, bin_processing_function) {
  return bin_engine(data, lower_bound, upper_bound, bin_size, Sum.generator, generic_accumulator, binning_projector, data_projector, bin_processing_function);
}

export default bin_sum;
