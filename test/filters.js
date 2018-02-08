var stats = require('../');
var expect = require('chai').expect;

describe('Filters', function() {

  describe('select()', function() {

    it('should call the callback when data matches on the expression', function() {
      var data = [
        {
          name: 'Jill'
        },
        {
          name: 'Jane'
        },
        {
          name: 'Juniper'
        }
      ];
      var datum = null;

      function expression(name) {
        return name == 'Jill';
      }

      function projector (data, i) {
        return data[i].name;
      }

      function callback (data, i) {
        datum = data[i];
      }

      stats.select(data, expression, callback, projector);

      expect(datum).to.deep.equal({name:'Jill'});
    });

  });

  describe('filter_range', function() {

    it('should call a callback function over a closed numberic range', function() {
      var data = [
        {
          x: -1
        },
        {
          x: 4
        },
        {
          x: 3
        },
        {
          x: 2
        },
        {
          x: 0
        },
        {
          x: 1
        },
        {
          x: -2
        }
      ];

      var accumulator = [];

      function projector(data, i) {
        return data[i].x;
      }

      function callback(data, i) {
        accumulator.push(projector(data, i));
      }

      stats.filter_range(data, -1, 1, callback, projector);

      expect(accumulator).to.deep.equal([-1,0,1]);
    });

  });

});
