import identity_projector from './projectors/identity';
import stateful_sum_accumulator from './accumulators/stateful/sum';

/**
 * sum() returns the sum of a data set
 *
 * @param {Array} data - array of data points
 * @param {Function} [projector] - projector function used to select the coordinate
 * @returns {number} - the sum
 */
function sum (data, projector) {
  var length = data.length;
  var getter = projector ? projector : identity_projector;
  var sum = stateful_sum_accumulator();

  for (var i = 0; i < length; i++) {
    sum.accumulate(getter(data, i));
  }
  return sum.valueOf();
}

export default sum;
