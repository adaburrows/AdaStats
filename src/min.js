import identity_projector from './projectors/identity';
import stateful_min_accumulator from './accumulators/stateful/min';

/**
 * min() returns the minimum value of a data set
 *
 * @param {Array} data - array of data points
 * @param {Function} projector - projection operator used to select the coordinate
 * @returns {number} - the minimum value
 */
function min (data, projector) {
  var length = data.length;
  var getter = projector ? projector : identity_projector;
  var curr = 0;
  var min = stateful_min_accumulator();

  for (var i = 1; i < length; i++) {
    min.accumulate(getter(data, i));
  }

  return min.valueOf();
}

export default min;
