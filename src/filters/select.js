import identity_projector from '../projectors/identity';

/**
 * select() executes the callback when the function expression is true
 *
 * @param {Array} data - Array of data points to operate on
 * @param {Function} expression - Function to evaluate
 * @param {Function} callback - Function to call when expression is true
 * @param {Function} [projector] - projector function used to access the data values with which to filter
 */
function select (data, expression, callback, projector) {
  var length = data.length,
    getter = identity_projector;

  if (projector) {
    getter = projector;
  }

  for (var i = 0; i < length; i++) {
    if (expression(getter(data, i))) {
      callback(data, i);
    }
  }
}

export default select;
