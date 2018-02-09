import identity_projector from './projectors/identity';
import mean from './mean';

/**
 * variance() returns the variance (second moment) of a data set
 *
 * @param {Array} data Array of data points
 * @param {Function} [projector] projector function used to select the coordinate
 * @returns {number} The value of variance
 */
function variance (data, projector) {
  var length = data.length,
    getter = identity_projector,
    sum = 0,
    m = 0,
    v = 0;

  if (projector) {
    getter = projector;
  }

  m = mean(data, getter);

  for (var i = 0; i < length; i++) {
    v = getter(data, i);
    sum += (v - m) * (v - m);
  }
  return sum / length;
}

export default variance;
