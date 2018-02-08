import integer_generator from '../accumulators/integer';
import summation from '../accumulators/summation';
import bin_engine from './bin_engine';

/**
 * bin_sum() bins data!
 *
 * @param {Array} data Data set
 * @param {number} lower_bound Lowest coordinate value to retain
 * @param {number} upper_bound Highest coordinate value to retain
 * @param {number} bin_size
 * @param {Function} [binning_projector] image of the projector function determines the values used for binning
 * @param {Function} [data_projector] image of projector function over the codomain of the bin is placed into bin
 * @param {Function} [bin_processing_function] function which does post processing on bins
 * @returns {Array} Bins of arrays of data!
 */
function bin_sum (data, lower_bound, upper_bound, bin_size, binning_projector, data_projector, bin_processing_function) {
  return bin_engine(data, lower_bound, upper_bound, bin_size, integer_generator, summation, binning_projector, data_projector, bin_processing_function);
}

export default bin_sum;
