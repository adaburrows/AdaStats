
define(function() {

  'use strict';

  var Statistics = {

    /**
     * bin_data() bins data!
     *
     * @param {Array} data Data set
     * @param {number} lower_bound Lowest coordinate value to retain
     * @param {number} upper_bound Highest coordinate value to retain
     * @param {number} bin_size
     * @param {Function} [basis_bin_engine] Determine the axis to bin. Either x_bin_engine or y_bin_engine.
     * @returns {Array} Bins of arrays of data!
     */
    bin_data: function(data, lower_bound, upper_bound, bin_size, basis_bin_engine) {
      var bin_engine = this.x_bin_engine;

      if (basis_bin_engine) {
        bin_engine = basis_bin_engine;
      }

      return bin_engine.call(this,
        data, lower_bound, upper_bound, bin_size, this.array_generator, this.toss_in_bin
      );
    },

    /**
     * bin_min()
     *
     * @param {Array} data Data set
     * @param {number} lower_bound Lowest coordinate value to retain
     * @param {number} upper_bound Highest coordinate value to retain
     * @param {number} bin_size
     * @param {Function} [basis_bin_engine] Determine the axis to bin. Either x_bin_engine or y_bin_engine.
     * @returns {Array} Bins containing the minimum value from the bin range
     */
    bin_min: function(data, lower_bound, upper_bound, bin_size, basis_bin_engine) {
      var self = this, bin_engine = this.x_bin_engine;

      if (basis_bin_engine) {
        bin_engine = basis_bin_engine;
      }

      return bin_engine.call(this,
        data, lower_bound, upper_bound, bin_size, this.array_generator, this.toss_in_bin,
        function(bins, i){
          bins[i] = self.min(bins[i], self.element_getter);
        }
      );
    },

    /**
     * bin_max()
     *
     * @param {Array} data Data set
     * @param {number} lower_bound Lowest coordinate value to retain
     * @param {number} upper_bound Highest coordinate value to retain
     * @param {number} bin_size
     * @param {Function} [basis_bin_engine] Determine the axis to bin. Either x_bin_engine or y_bin_engine.
     * @returns {Array} Bins containing the maximum value from the bin range
     */
    bin_max: function(data, lower_bound, upper_bound, bin_size, basis_bin_engine) {
      var self = this, bin_engine = this.x_bin_engine;

      if (basis_bin_engine) {
        bin_engine = basis_bin_engine;
      }

      return bin_engine.call(this,
        data, lower_bound, upper_bound, bin_size, this.array_generator, this.toss_in_bin,
        function(bins, i){
          bins[i] = self.max(bins[i], self.element_getter);
        }
      );
    },

    /**
     * bin_sum()
     *
     * @param {Array} data Data set
     * @param {number} lower_bound Lowest coordinate value to retain
     * @param {number} upper_bound Highest coordinate value to retain
     * @param {number} bin_size
     * @param {Function} [basis_bin_engine] Determine the axis to bin. Either x_bin_engine or y_bin_engine.
     * @returns {Array} Bins containing the sum of values in the bin range
     */
    bin_sum: function(data, lower_bound, upper_bound, bin_size, basis_bin_engine) {
      var bin_engine = this.x_bin_engine;

      if (basis_bin_engine) {
        bin_engine = basis_bin_engine;
      }

      return bin_engine.call(this,
        data, lower_bound, upper_bound, bin_size, this.integer_generator, this.accumulate
      );
    },

    /**
     * bin_mean()
     *
     * @param {Array} data Data set
     * @param {number} lower_bound Lowest coordinate value to retain
     * @param {number} upper_bound Highest coordinate value to retain
     * @param {number} bin_size
     * @param {Function} [basis_bin_engine] Determine the axis to bin. Either x_bin_engine or y_bin_engine.
     * @returns {Array} Bins containing the mean of the values in the bin range
     */
    bin_mean: function(data, lower_bound, upper_bound, bin_size, basis_bin_engine) {
      var self = this, bin_engine = this.x_bin_engine;

      if (basis_bin_engine) {
        bin_engine = basis_bin_engine;
      }

      return bin_engine.call(this,
        data, lower_bound, upper_bound, bin_size, this.array_generator, this.toss_in_bin,
        function(bins, i){
          bins[i] = self.mean(bins[i], self.element_getter);
        }
      );
    },

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
