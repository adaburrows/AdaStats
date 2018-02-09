
define(function() {

  'use strict';

  var Statistics = {

    /**
     * bin_variance()
     *
     * @param {Array} data Data set
     * @param {number} lower_bound Lowest coordinate value to retain
     * @param {number} upper_bound Highest coordinate value to retain
     * @param {number} bin_size
     * @param {Function} [basis_bin_engine] Determine the axis to bin. Either x_bin_engine or y_bin_engine.
     * @returns {Array} Bins containing the variance of the values in the bin range
     */
    bin_variance: function(data, lower_bound, upper_bound, bin_size, basis_bin_engine) {
      var self = this, bin_engine = this.x_bin_engine;

      if (basis_bin_engine) {
        bin_engine = basis_bin_engine;
      }

      return bin_engine.call(this,
        data, lower_bound, upper_bound, bin_size, this.array_generator, this.toss_in_bin,
        function(bins, i){
          bins[i] = self.variance(bins[i], self.element_getter);
        }
      );
    },

    /**
     * bin_deviation()
     *
     * @param {Array} data Data set
     * @param {number} lower_bound Lowest coordinate value to retain
     * @param {number} upper_bound Highest coordinate value to retain
     * @param {number} bin_size size of bins
     * @param {Function} [basis_bin_engine] Determine the axis to bin. Either x_bin_engine or y_bin_engine.
     * @returns {Array} Bins containing the deviation of the values in the bin range
     */
    bin_deviation: function(data, lower_bound, upper_bound, bin_size, basis_bin_engine) {
      var self = this, bin_engine = this.x_bin_engine;

      if (basis_bin_engine) {
        bin_engine = basis_bin_engine;
      }

      return bin_engine.call(this,
        data, lower_bound, upper_bound, bin_size, this.array_generator, this.toss_in_bin,
        function(bins, i){
          bins[i] = self.deviation(bins[i], self.element_getter);
        }
      );
    }

  };

  return Statistics;
});
