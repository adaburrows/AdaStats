
define(function() {

  'use strict';

  var Statistics = {

    /**
     * select() executes the callback when the function expression is true
     *
     * @param {Array} data Array of data points to operate on
     * @param {Function} expression Function to evaluate
     * @param {Function} callback Function to call when expression is true
     */
    select: function(data, expression, callback) {
      var length = data.length, x, y;

      for (var i = 0; i < length; i++) {
        x = this.x_getter(data,i);
        y = this.y_getter(data,i);
        if (expression(x,y)) {
          callback(x, y);
        }
      }
    },

    /**
     * filter_x_range() filters data sets to a subset of points within a range
     *
     * @param {Array} data Data set
     * @param {number} lower_x_bound Lowest x coordinate value to retain
     * @param {number} upper_x_bound Highest x coordinate value to retain
     * @param {Function} callback Function to call when a coordinate falls within the range
     */
    filter_x_range: function(data, lower_x_bound, upper_x_bound, callback) {
      // Iterate over data, calling the callback only in the specified range
      this.select(
        data,
        function(x, y) {
          return (x >= lower_x_bound && x <= upper_x_bound);
        },
        callback
      );
    },

    /**
     * filter_y_range() filters data sets to a subset of points within a range
     *
     * @param {Array} data Data set
     * @param {number} lower_y_bound Lowest y coordinate value to retain
     * @param {number} upper_y_bound Highest y coordinate value to retain
     * @param {Function} callback Function to call when a coordinate falls within the range
     */
    filter_y_range: function(data, lower_y_bound, upper_y_bound, callback) {
      // Iterate over data, calling the callback only in the specified range
      this.select(
        data,
        function(x, y) {
          return (y >= lower_y_bound && y <= upper_y_bound);
        },
        callback
      );
    },

    /**
     * bin_size() calculates the size of a bin
     *
     * @param {number} lower_bound
     * @param {number} upper_bound
     * @param {number} bin_count The number of bins to create
     * @returns {number} The size of the resultant bins
     */
    bin_size: function(lower_bound, upper_bound, bin_count) {
      return Math.ceil(Math.abs(upper_bound - lower_bound) / bin_count);
    },

    /**
     * bin_count() calculates the number of bins given the bin size and range
     *
     * @param {number} lower_bound
     * @param {number} upper_bound
     * @param {number} bin_size The size of the bins
     * @returns {number} The number of resultant bins
     */
    bin_count: function(lower_bound, upper_bound, bin_size) {
      return Math.ceil(Math.abs(upper_bound - lower_bound) / bin_size);
    },

    /**
     * array_generator() returns an array for a bin to store values
     *
     * @returns {Array} Array type for initializing a bin
     */
    array_generator: function() {
      return [];
    },

    /**
     * integer_generator() returns an initial zero for a bin to accumulate values
     *
     * @returns {Array} number type for initializing a bin
     */
    integer_generator: function() {
      return 0;
    },

    /**
     * toss_in_bin() Pushes a value onto a bin
     * This is used for composing more advanced functionality
     *
     * @param {Array} bins Array of bins
     * @param {number} bin Current bin
     * @param {number} value Value to push onto the current bin
     */
    toss_in_bin: function(bins, bin, value) {
      bins[bin].push(value);
    },

    /**
     * toss_in_bin() Accumulates values in a bin
     * This is used for composing more advanced functionality
     *
     * @param {Array} bins Array of bins
     * @param {number} bin Current bin
     * @param {number} value Value to accumulate in the current bin
     */
    accumulate: function(bins, bin, value) {
      bins[bin] += value;
    },

    /**
     * post_process_bins() converts the raw bins array into data we can plot
     *
     * @param {number} bin_count
     * @param {number} bin_size
     * @param {number} lower_bound
     * @param {Array} bins
     * @param {Function} [bin_processing_function] Function for more advanced processing
     */
    post_process_bins: function(bin_count, bin_size, lower_bound, bins, bin_processing_function) {
      for (var i = 0; i < bin_count; i++) {

        // Calculate the center of the bin
        var center = lower_bound + ( (2 * i + 1) / 2 * bin_size);

        // Process the bin, if need be
        if (bin_processing_function) {
          bin_processing_function(bins, i);
        }

        // return data in the same format we receive it
        bins[i] = [center, bins[i]];
      }
    },

    /**
     * x_bin_engine() is the main workhorse behind all the data binning along the x-axis
     *
     * @param {Array} data Data set
     * @param {number} lower_x_bound Lowest x coordinate value to retain
     * @param {number} upper_x_bound Highest x coordinate value to retain
     * @param {number} bin_size
     * @param {Function} generator Function to initialize bins, corresponds to data_processing_function
     * @param {Function} data_processing_function Either toss_in_bin() or accumulate()
     * @param {Function} [bin_processing_function] Function to process data once in bins, usually used with toss_in_bin()
     * @returns {Array} Bins of processed data!
     */
    x_bin_engine: function(data, lower_x_bound, upper_x_bound, bin_size, generator, data_processing_function, bin_processing_function) {
      var bin_count = this.bin_count(lower_x_bound, upper_x_bound, bin_size),
          bins     = [],
          i = 0;

      // Initialize bins
      for (i = 0; i < bin_count; i++) {
        bins[i] = generator();
      }

      // Sweep through the data using the integer divider of the range to accumulate the data in the proper bin
      this.filter_x_range(data, lower_x_bound, upper_x_bound, function(x, y) {
        // Calculate the floor of the bin
        var bin = Math.floor((x - lower_x_bound) / bin_size);
        data_processing_function(bins, bin, y);
      });

      this.post_process_bins(bin_count, bin_size, lower_x_bound, bins, bin_processing_function);
      return bins;
    },

    /**
     * y_bin_engine() is the main workhorse behind all the data binning along the y-axis
     *
     * @param {Array} data Data set
     * @param {number} lower_y_bound Lowest x coordinate value to retain
     * @param {number} upper_y_bound Highest x coordinate value to retain
     * @param {number} bin_size
     * @param {Function} generator Function to initialize bins, corresponds to data_processing_function
     * @param {Function} data_processing_function Either toss_in_bin() or accumulate()
     * @param {Function} [bin_processing_function] Function to process data once in bins, usually used with toss_in_bin()
     * @returns {Array} Bins of processed data!
     */
    y_bin_engine: function(data, lower_y_bound, upper_y_bound, bin_size, generator, data_processing_function, bin_processing_function) {
      var bin_count = this.bin_count(lower_y_bound, upper_y_bound, bin_size),
          bins     = [],
          i = 0;

      // Initialize bins
      for (i = 0; i < bin_count; i++) {
        bins[i] = generator();
      }

      // Sweep through the data using the integer divider of the range to accumulate the data in the proper bin
      this.filter_y_range(data, lower_y_bound, upper_y_bound, function(x, y) {
        // Calculate the floor of the bin
        var bin = Math.floor((y - lower_y_bound) / bin_size);
        data_processing_function(bins, bin, x);
      });

      this.post_process_bins(bin_count, bin_size, lower_y_bound, bins, bin_processing_function);
      return bins;
    },

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
