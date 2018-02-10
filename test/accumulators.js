var stats = require('../');
var expect = require('chai').expect;

describe('Accumulators', function() {

  describe('Stateful Accumulators', function() {

    describe('Set accumulator', function() {

      it('should accumulate values in a set', function() {
        var test = [1,2,3,4,5];
        var s = new stats.stateful_set_accumulator();

        for (var i = 0; i < 5; i++) {
          s.accumulate(test[i]);
        }
        expect(s.valueOf()).to.deep.equal(test);
      });

    });

    describe('Sum accumulator', function() {

      it('should accumulate values in a sum', function() {
        var test = [1,2,3,4,5];
        var s = new stats.stateful_sum_accumulator();

        for (var i = 0; i < 5; i++) {
          s.accumulate(test[i]);
        }
        expect(s.valueOf()).to.equal(15);
      });

      it('should fail to accumulate caertain values in a sum', function() {
        var test = [1.0, parseFloat('1.0E+100'), 1.0, parseFloat('-1.0E+100'), 1.0];
        var s = stats.stateful_sum_accumulator();

        for (var i = 0; i < 5; i++) {
          s.accumulate(test[i]);
        }
        expect(s.valueOf()).to.not.equal(3); // algebraicaly, this should be 3 -- but it's not
      });

    });

    describe('Neumaier Sum accumulator', function() {

      it('should accumulate values in a sum', function() {
        var test = [1.0, parseFloat('1.0E+100'), 1.0, parseFloat('-1.0E+100'), 1.0];
        var s = stats.stateful_neumaier_sum_accumulator();

        for (var i = 0; i < 5; i++) {
          s.accumulate(test[i]);
        }
        expect(s.valueOf()).to.equal(3);
      });

    });

    describe('Min accumulator', function() {

      it('should accumulate the smallest value', function() {
        var test = [5,4,3,2,1];
        var s = new stats.stateful_min_accumulator();

        for (var i = 0; i < 5; i++) {
          s.accumulate(test[i]);
        }
        expect(s.valueOf()).to.equal(1);
      });

    });

    describe('Max accumulator', function() {

      it('should accumulate the greatest value', function() {
        var test = [5,4,3,2,1];
        var s = new stats.stateful_max_accumulator();

        for (var i = 0; i < 5; i++) {
          s.accumulate(test[i]);
        }
        expect(s.valueOf()).to.equal(5);
      });

    });

    describe('Mean accumulator', function() {

      it('should accumulate the mean of the values', function() {
        var test = [5,4,3,2,1];
        var s = new stats.stateful_mean_accumulator();

        for (var i = 0; i < 5; i++) {
          s.accumulate(test[i]);
        }
        expect(s.valueOf()).to.equal(3);
      });

    });

    describe('generic_accumulator()', function() {

      it('should adapt an accumulator to a set of bins', function() {
        var bins = [];
        var i = 0;
        bins[i] = new stats.stateful_set_accumulator();
        stats.generic_accumulator(bins, i, 42);
        expect(bins[i].valueOf()).to.include(42);
      });

    });

  });

});
