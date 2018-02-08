/**
 * @fileOverview Embarrassingly basic, yet flexible statistics library.
 * Focused around finding the minimum, maximum, mean, variance, or
 * deviation of a set. It also allows binning a series into a set of
 * ranges and applying a statistical function to those ranges.
 *
 * @author <a href="mailto:jill@adaburrowss.com">Jill Burrows</a>
 * @version 1.0.0
 *
 */

// Miscellaneous Utilities
export {default as round_down} from './src/misc/round_down';
export {default as round_up} from './src/misc/round_up';
export {default as log_2} from './src/misc/log_2';

// Data Projection functions -- library operates on the image, data is the preimage
export {default as identity_projector} from './src/projectors/identity';
export {default as x_projector} from './src/projectors/x';
export {default as y_projector} from './src/projectors/y';

// Filtering functions
export {default as select} from './src/filters/select';
export {default as filter_range} from './src/filters/filter_range';

// Basic Statistic Operations
export {default as min} from './src/min';
export {default as max} from './src/max';
export {default as mean} from './src/mean';
export {default as variance} from './src/variance';
export {default as deviation} from './src/deviation';

// Accumulator functions
export {default as undefined_generator} from './src/accumulators/undefined';
export {default as integer_generator} from './src/accumulators/integer';
export {default as summation} from './src/accumulators/summation';
export {default as min_accumulator} from './src/accumulators/min';
export {default as array_generator} from './src/accumulators/array';
export {default as union} from './src/accumulators/union';

// Binning functions
export {default as bin_size} from './src/binning/bin_size';
export {default as bin_count} from './src/binning/bin_count';
export {default as post_process_bins} from './src/binning/post_process_bins';
export {default as bin_engine} from './src/binning/bin_engine';
export {default as bin_data} from './src/binning/bin_data';
export {default as bin_sum} from './src/binning/bin_sum';
export {default as bin_min} from './src/binning/bin_min';
