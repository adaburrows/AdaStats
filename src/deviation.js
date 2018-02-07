/**
 * deviation() returns the standard deviation of a data set
 *
 * @param {Array} data - Array of data points
 * @param {Function} [projector] - projector function used to select the coordinate
 * @returns {number} - the standard deviation
 */
function deviation (data, projector) {
  return Math.sqrt(this.variance(data, projector));
}

export default deviation;
