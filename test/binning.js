var stats = require('../');
var expect = require('chai').expect;

const numberList = [10, 13, 11, 5, 23, 101];
const pointList = [[12, 11], [13, 17], [15, 18], [5, 3], [23, 19], [101, 108]];

describe('Binning', function() {

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
        var bins = stats.bin_engine(data, -10, 30, 10, stats.SetAccumulator.generator, stats.generic_accumulator);

        expect(bins).to.deep.equal(preworked_bins);
      });

      it('should take complicated data as the codomain and bin the image of the data projector into bin over the image of the binning projector function', function () {
        var codomain = [
          {
            date: 1,
            data: {
              temperature: 95,
              humidity: 20,
              windspeed: 100
            }
          },
          {
            date: 2,
            data: {
              temperature: 200,
              humidity: 80,
              windspeed: 95
            }
          },
          {
            date: 3,
            data: {
              temperature: -300,
              humidity: 0,
              windspeed: 0
            }
          },
          {
            date: 4,
            data: {
              temperature: -250,
              humidity: 0,
              windspeed: 0
            }
          },
          {
            date: 5,
            data: {
              temperature: 30,
              humidity: 10,
              windspeed: 40
            }
          },
          {
            date: 6,
            data: {
              temperature: 95,
              humidity: 30,
              windspeed: 100
            }
          }
        ];
        var preworked_bins = [
          [2, [95, 200]],
          [4, [-300, -250]],
          [6, [30, 95]]
        ];

        function filter_projector(data, i) {
          return data[i].date;
        }

        function data_projector(data, i) {
          return data[i].data.temperature;
        }

        var bins = stats.bin_engine(codomain, 1, 6, 2, stats.SetAccumulator.generator, stats.generic_accumulator, filter_projector, data_projector);

        expect(bins).to.deep.equal(preworked_bins);

      });

    });

  });

  describe('bin_data()', function() {

    it('should bin data into 4 bins of size ten ranging from -10 to 30', function() {
      var data = [-10, -5, 2, 4, 8, 11, 15, 19, 23, 27];
      var preworked_bins = [
        [-5, [-10,-5]],
        [5, [2, 4, 8]],
        [15, [11, 15, 19]],
        [25, [23, 27]]
      ];
      var bins = stats.bin_data(data, -10, 30, 10);

      expect(bins).to.deep.equal(preworked_bins);
    });

  });

  describe('bin_sum()', function() {

    it('should sum data within 4 bins of size ten ranging from -10 to 30', function() {
      var data = [-10, -5, 2, 4, 8, 11, 15, 19, 23, 27];
      var preworked_bins = [
        [-5, -15],
        [5, 14],
        [15, 45],
        [25, 50]
      ];
      var bins = stats.bin_sum(data, -10, 30, 10);

      expect(bins).to.deep.equal(preworked_bins);
    });

  });

  describe('bin_min()', function() {

    it('should find the minumum within 4 bins of size ten ranging from -10 to 30', function() {
      var data = [-10, -5, 2, 4, 8, 11, 15, 19, 23, 27];
      var preworked_bins = [
        [-5, -10],
        [5, 2],
        [15, 11],
        [25, 23]
      ];
      var bins = stats.bin_min(data, -10, 30, 10);

      expect(bins).to.deep.equal(preworked_bins);
    });

  });

  describe('bin_max()', function() {

    it('should find the maxumum within 4 bins of size ten ranging from -10 to 30', function() {
      var data = [-10, -5, 2, 4, 8, 11, 15, 19, 23, 27];
      var preworked_bins = [
        [-5, -5],
        [5, 8],
        [15, 19],
        [25, 27]
      ];
      var bins = stats.bin_max(data, -10, 30, 10);

      expect(bins).to.deep.equal(preworked_bins);
    });

  });

  describe('bin_mean()', function() {

    it('should find the mean for each of 4 bins of size ten ranging from -10 to 30', function() {
      var data = [-10, -4, 4, 8, 13, 15, 23, 27];
      var preworked_bins = [
        [-5, -7],
        [5, 6],
        [15, 14],
        [25, 25]
      ];
      var bins = stats.bin_mean(data, -10, 30, 10);

      expect(bins).to.deep.equal(preworked_bins);
    });

  });

  describe('bin_variance()', function() {

    it('should find the variance for each of 4 bins of size ten ranging from -10 to 30', function() {
      var data = [-10, -4, 4, 8, 13, 15, 23, 27];
      var preworked_bins = [
        [-5, 9],  // (-10+7)^2 + (-4+7)^2 = 9 + 9 = 18
        [5, 4],   // (4-6)^2 + (8-6)^2 = 4 + 4 = 8
        [15, 1],  // (13-14)^2 + (15-14)^2 = 1 + 1 = 2
        [25, 4]   // (23-25)^2 + (27-25)^2 = 4 + 4 = 8
      ];
      var bins = stats.bin_variance(data, -10, 30, 10);

      expect(bins).to.deep.equal(preworked_bins);
    });

  });

  describe('bin_deviation()', function() {

    it('should find the deviation for each of 4 bins of size ten ranging from -10 to 30', function() {
      var data = [-10, -4, 4, 8, 13, 15, 23, 27];
      var preworked_bins = [
        [-5, 3],  // (-10+7)^2 + (-4+7)^2 = 9 + 9 = 18
        [5, 2],   // (4-6)^2 + (8-6)^2 = 4 + 4 = 8
        [15, 1],  // (13-14)^2 + (15-14)^2 = 1 + 1 = 2
        [25, 2]   // (23-25)^2 + (27-25)^2 = 4 + 4 = 8
      ];
      var bins = stats.bin_deviation(data, -10, 30, 10);

      expect(bins).to.deep.equal(preworked_bins);
    });

  });

});
