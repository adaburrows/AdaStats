import identity_projector from './projectors/identity';
import stateful_sum_accumulator from './accumulators/stateful/sum';

/**
 * mean() returns the mean (first moment) of a data set
 *
 * @param {Array} data - array of data points
 * @param {Function} [projector] - projector function used to select the coordinate
 * @returns {number} - the mean value
 */
function mean (data, projector) {
  var length = data.length;
  var getter = projector ? projector : identity_projector;
  var sum = new stateful_sum_accumulator();

  for (var i = 0; i < length; i++) {
    sum.accumulate(getter(data, i));
  }
  return sum.valueOf() / length;
}

export default mean;
