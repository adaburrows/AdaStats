import generic_accumulator from '../accumulators/generic';
import Max from '../accumulators/stateful/max';
import bin_engine from './bin_engine';

/**
 * bin_max() leaves the maximum number of each bin in the bin
 *
 * @param {Array} data - data set
 * @param {number} lower_bound - lowest coordinate value to retain
 * @param {number} upper_bound - highest coordinate value to retain
 * @param {number} bin_size - size of each bin
 * @param {Function} [binning_projector] - image of the projector function determines the values used for binning
 * @param {Function} [data_projector] - maximum element of the image of the projector function is placed into bin
 * @param {Function} [bin_processing_function] - function which does post processing on bins
 * @returns {Array} - bins of arrays of data
 */
function bin_max (data, lower_bound, upper_bound, bin_size, binning_projector, data_projector, bin_processing_function) {
  return bin_engine(data, lower_bound, upper_bound, bin_size, Max.generator, generic_accumulator, binning_projector, data_projector, bin_processing_function);
}

export default bin_max;
