import identity_projector from './projectors/identity';

/**
 * max() returns the maximum value of a data set
 *
 * @param {Array} data - array of data points
 * @param {Function} projector - projection operator used to select the coordinate
 * @returns {number} - the maximum value
 */
function max (data, projector) {
  var length = data.length,
    getter = identity_projector,
    curr = 0,
    max = null;

  if (projector) {
    getter = projector;
  }

  max = getter(data, 0);

  for (var i = 1; i < length; i++) {
    curr = getter(data, i);
    if(curr > max) {
      max = curr;
    }
  }
  return max;
}

export default max;
