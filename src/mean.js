import identity_projector from './projectors/identity';

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
  var sum = null;

  for (var i = 0; i < length; i++) {
    sum += getter(data, i);
  }
  return sum / length;
}

export default mean;
