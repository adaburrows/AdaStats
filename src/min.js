import identity_projector from './projectors/identity';

/**
 * min() returns the minimum value of a data set
 *
 * @param {Array} data - array of data points
 * @param {Function} projector - projection operator used to select the coordinate
 * @returns {number} - the minimum value
 */
function min (data, projector) {
  var length = data.length,
    getter = identity_projector,
    curr = 0,
    min = null;

  if (projector) {
    getter = projector;
  }

  min = getter(data, 0);

  for (var i = 1; i < length; i++) {
    curr = getter(data, i);
    if(curr < min) {
      min = curr;
    }
  }

  return min;
}

export default min;
