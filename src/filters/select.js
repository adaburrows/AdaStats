import identity_projector from '../projectors/identity';

/**
 * select() executes the callback when the function expression is true
 *
 * @param {Array} data - array of data points to operate on
 * @param {Function} expression - function to evaluate
 * @param {Function} callback - function to call when expression is true
 * @param {Function} [projector] - projector function used to access the data values with which to filter
 */
function select (data, expression, callback, projector) {
  var length = data.length;
  var getter = projector ? projector : identity_projector;

  for (var i = 0; i < length; i++) {
    if (expression(getter(data, i))) {
      callback(data, i);
    }
  }
}

export default select;
