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

// Basic Statistic Operations
export {default as min} from './src/min';
export {default as max} from './src/max';
export {default as mean} from './src/mean';
export {default as variance} from './src/variance';