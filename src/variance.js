import identity_projector from './projectors/identity';
import mean from './mean';

/**
 * variance() returns the variance (second moment) of a data set
 *
 * @param {Array} data - array of data points
 * @param {Function} [projector] - projector function used to select the coordinate
 * @returns {number} - the value of variance
 */
function variance (data, projector) {
  var length = data.length;
  var getter = projector ? projector : identity_projector;
  var sum = 0;
  var m = 0;
  var v = 0;

  m = mean(data, getter);

  for (var i = 0; i < length; i++) {
    v = getter(data, i);
    sum += (v - m) * (v - m);
  }
  return sum / length;
}

export default variance;
