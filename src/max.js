import identity_projector from './projectors/identity';
import Max from './accumulators/stateful/max';

/**
 * max() returns the maximum value of a data set
 *
 * @param {Array} data - array of data points
 * @param {Function} projector - projection operator used to select the coordinate
 * @returns {number} - the maximum value
 */
function max (data, projector) {
  var length = data.length;
  var getter = projector ? projector : identity_projector;
  var curr = 0;
  var max = new Max();

  for (var i = 1; i < length; i++) {
    max.accumulate(getter(data, i));
  }

  return max.valueOf();
}

export default max;
