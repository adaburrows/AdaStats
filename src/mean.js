import identity_projector from './projectors/identity';
import stateful_mean_accumulator from './accumulators/stateful/mean';

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
  var mean = new stateful_mean_accumulator();

  for (var i = 0; i < length; i++) {
    mean.accumulate(getter(data, i));
  }
  return mean.valueOf();
}

export default mean;
