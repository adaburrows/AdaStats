import array_generator from '../accumulators/array';
import union from '../accumulators/union';
import bin_engine from './bin_engine';
import variance from '../variance';

/**
 * bin_sum() bins data!
 *
 * @param {Array} data Data set
 * @param {number} lower_bound Lowest coordinate value to retain
 * @param {number} upper_bound Highest coordinate value to retain
 * @param {number} bin_size
 * @param {Function} [binning_projector] image of the projector function determines the values used for binning
 * @param {Function} [data_projector] image of projector function over the codomain of the bin is placed into bin
 * @returns {Array} Bins of arrays of data!
 */
function bin_variance (data, lower_bound, upper_bound, bin_size, binning_projector, data_projector, bin_processing_function) {
  return bin_engine(data, lower_bound, upper_bound, bin_size, array_generator, union, binning_projector, data_projector, function bin_processing_function (bins, i) {
    bins[i] = variance(bins[i]);
  });
}

export default bin_variance;
