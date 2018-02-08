var stats = require('../');
var expect = require('chai').expect;

const numberList = [10, 13, 11, 5, 23, 101];
const pointList = [[12, 11], [13, 17], [15, 18], [5, 3], [23, 19], [101, 108]];

describe('Binning', function() {

  describe('Accumulator Functions', function() {

    describe('integer_generator()', function() {

      it('should return an number zero', function() {
        var accumulator = stats.integer_generator();
        expect(accumulator).to.be.a('number');
        expect(accumulator).to.be.equal(0);
      });

    });

    describe('array_generator()', function() {

      it('should return an empty array', function() {
        var accumulator = stats.array_generator();
        expect(accumulator).to.be.a('Array');
        expect(accumulator).to.be.empty;
      });

    });

    describe('summation()', function() {

      it('should sum-accumulate a number in a bin', function() {
        var bins = [];
        var i = 0;
        bins[i] = stats.integer_generator();
        stats.summation(bins, i, 5);
        expect(bins[i]).to.be.a('number');
        expect(bins[i]).to.be.equal(5);
      });

    });

    describe('union()', function() {

      it('should union-accumulate a number in a bin', function() {
        var bins = [];
        var i = 0;
        bins[i] = stats.array_generator();
        stats.union(bins, i, 5);
        expect(bins[i]).to.be.a('array');
        expect(bins[i]).to.include(5);
      });

    });

  });

  describe('Binning Utilities', function() {

    describe('bin_size()', function() {

      /**
       * Imagine a number line broken down exactly into 6 bins of size 11:
       *
       *-33   -22   -11   0      11    22    33
       * +-----+-----+-----+-----+-----+-----+
       * |  1  |  2  |  3  |  4  |  5  |  6  |
       * +-----+-----+-----+-----+-----+-----+
       */

      it('should return the size of the bins given bounds and a count of the bins', function() {
        var size = stats.bin_size(-33,33,6);
        expect(size).to.be.a('number');
        expect(size).to.equal(11);
      });

    });

    describe('bin_count()', function() {

      // Use the same visual as above for reference

      it('should return the number of the bins given bounds and a size of the bins', function() {
        var n = stats.bin_size(-33,33,11);
        expect(n).to.be.a('number');
        expect(n).to.equal(6);
      });

      /**
       * Imagine a number line broken down exactly into 4 bins of size 10:
       *
       *-10    0     10    20    30
       * +-----+-----+-----+-----+
       * |  1  |  2  |  3  |  4  |
       * +-----+-----+-----+-----+
       * Since 23 is greater than 20 and each bin is size 10, there should be a bin for it to fill
       */

      it('should return the number of the bins given bounds and a size of the bins', function() {
        var n = stats.bin_size(-10,23,10);
        expect(n).to.be.a('number');
        expect(n).to.equal(4);
      });

    });

  });

  describe('Binning Core', function() {

    describe('post_process_bins()', function() {

      const original_bins = [[-10,-8,-6,-4], [0,1,2,3], [10,15]];
      const centers = [-5,5,15];

      it('should package bins into an array with the first element as the center of the bin and the second element should contian the bin', function() {
        var bins = [[-10,-8,-6,-4], [0,1,2,3], [10,15]];
        stats.post_process_bins(3, 10, -10, bins);

        for (var i = 0; i < 3; i ++) {
          expect(bins[i][0]).to.equal(centers[i]);
          expect(bins[i][1]).to.deep.equal(original_bins[i]);
        }
      });

      it('should call the bin_processing_function with the proper data', function() {
        var bins = [[-10,-8,-6,-4], [0,1,2,3], [10,15]];
        var test_bins = [];
        var test_indices = [];
        function test_processing_function (bins, i){
          test_bins.push(bins[i]);
          test_indices.push(i);
        }

        stats.post_process_bins(3, 10, -10, bins, test_processing_function);

        for (var i = 0; i < 3; i ++) {
          expect(test_bins[i]).to.deep.equal(original_bins[i]);
          expect(test_indices[i]).to.equal(i);
        }
      });

    });

    describe('bin_engine()', function() {

      /**
       * Imagine a number line broken down exactly into 4 bins of size 10:
       *
       *-10    0     10    20    30
       * +-----+-----+-----+-----+
       * |  1  |  2  |  3  |  4  |
       * +-----+-----+-----+-----+
       */

      it('should bin data into 4 bins of size ten ranging from -10 to 30', function() {
        var data = [-10, -5, 2, 4, 8, 11, 15, 19, 23, 27];
        var preworked_bins = [
          [-5, [-10,-5]],
          [5, [2, 4, 8]],
          [15, [11, 15, 19]],
          [25, [23, 27]]
        ];
        var bins = stats.bin_engine(data, -10, 30, 10, stats.array_generator, stats.union);

        expect(bins).to.deep.equal(preworked_bins);
      });

    });

  });

});
