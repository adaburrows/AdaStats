import generic_accumulator from '../accumulators/generic';
import set from '../accumulators/stateful/set';
import bin_engine from './bin_engine';
import variance from '../variance';

/**
 * bin_variance() calculates the variances within each bin of data
 *
 * @param {Array} data - data set
 * @param {number} lower_bound - lowest coordinate value to retain
 * @param {number} upper_bound - highest coordinate value to retain
 * @param {number} bin_size - size of each bin
 * @param {Function} [binning_projector] - image of the projector function determines the values used for binning
 * @param {Function} [data_projector] - image of projector function is placed into bin
 * @returns {Array} - bins of arrays of data
 */
function bin_variance (data, lower_bound, upper_bound, bin_size, binning_projector, data_projector, bin_processing_function) {
  return bin_engine(data, lower_bound, upper_bound, bin_size, set, generic_accumulator, binning_projector, data_projector, function bin_processing_function (bins, i) {
    bins[i] = variance(bins[i]);
  });
}

export default bin_variance;
