import select from './select';

/**
 * filter_range() filters a data set to a subset of points within an closed range. It also is an example of how to use select.
 *
 * @param {Array} data - data set
 * @param {number} lower_bound - lowest coordinate value to retain
 * @param {number} upper_bound - highest coordinate value to retain
 * @param {Function} callback - function to call when a coordinate falls within the range
 * @param {Function} [projector] - image of projector function is used for filtering 
 */
function filter_range (data, lower_bound, upper_bound, callback, projector) {
  // Iterate over data, calling the callback only in the specified range
  select(
    data,
    function(value) {
      return (value >= lower_bound && value <= upper_bound);
    },
    callback,
    projector // use select's default identity_projector if this is undefined
  );
}

export default filter_range;
