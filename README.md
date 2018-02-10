AdaStats
========
[![Build Status](https://travis-ci.org/adaburrows/AdaStats.svg?branch=master)](https://travis-ci.org/adaburrows/AdaStats)

A basic, extremely flexible statistics library. It is meant to be used with large sets of data processed quickly, preferably in one pass over the data. It also allows binning a series into a set of ranges and applying a statistical function to those ranges doing both in one pass. This was originally written to be used for aggregating data about individual Puppet Enterprise runs and outcomes of those runs over time in the UI with D3.

If you have data which is more structured and need to pluck data off it, this library can save that step. It uses mathematical projection operators to perform statistics on the projection of your data. This means you don't have to make a separate copy of your data. It does however mean one must deal with an extra function call each time the preimage(the unaltered application data) is iterated over. If you've used D3, this will be a familiar pattern (the data accessor). This is the standard trade off of using less memory for a very slight trade-off in execution speed. This overhead is negligible in modern JavaScript execution contexts and adds a lot of flexibility. There's an optimization that uses side effects in the `bin_engine`. This is to prevent garbage collection while processing large batches of data.

Currently, this library can calculate sum, min, max, and mean all in one pass over the data. Calculating variance and deviation both require an additional pass over the data. Binning data into intervals is also done in one pass, and calculating the sum, min, max, and mean of each of the bins can be done in the same pass as binning. In fact, sum, min, max, and mean can all be calculated in one pass over the data.

This library has a bit of overlap with `d3-array`, but there's a big difference. By default, this library uses [Neumaier sums]() instead of normal summation. This takes into account the error introduced through repeated addition of large and small positive and negative numbers with the floating point data structure. If you demand more accurate summation in your underlying algorithms, this library is for you.

If you need more functionality I highly recommend [Simple Statistics](https://simplestatistics.org/). Keep in mind that library will require you to compute the image of your data (so it's just a flat array), before it can operate on it.

## Usage Examples
Please [take a look at the tests for usage examples](https://github.com/adaburrows/AdaStats/tree/master/test) until I write more documentation.

```
var Stats = require('AdaStats');

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

function filter_projector(data, i) {
  return data[i].date;
}

function data_projector(data, i) {
  return data[i].data.temperature;
}

var bins = Stats.bin_engine(codomain, 1, 6, 2, Stats.SetAccumulator.generator, Stats.generic_accumulator, filter_projector, data_projector);

// bins = [
//   [2, [95, 200]],
//   [4, [-300, -250]],
//   [6, [30, 95]]
// ];
```

## Possible Improvements
Currently, this is inefficient for many repeated queries of binning the same data over and over again. It could be improved by using [hash maps](https://en.wikipedia.org/wiki/Hash_table) and [interval trees](https://en.wikipedia.org/wiki/Interval_tree). Sorting data ahead of time may allow a few additional optimizations. At the moment the algorithms run at O(n), but with a few optimizations it could take more upfront time to process the data so that repeated queries could be faster. Of course the decision to undertake that optimization depends on use cases. If the data is only queried twice, it's not worth it since some of the data structures require O(n log n) time to construct with a speed up of only O(log n + m) from O(n).

Using web workers, it would be possible for the data to be split up and processed in parallel instead of the serial processing the standard browser execution model does. The way the accumulators are structured would allow this to happen with few changes. Of course, one needs to take into consideration the overhead of using web workers since it fetches an additional file from the server for the web worker code thereby introducing latency -- unless it is already cached.

In terms of the code and interface, it really uses quite a hybrid approach which could be standardized around being more object oriented and take complete advantage of the mixins provided in ES6. I originally wrote it to be pure functional composition, and that can be seen in the interface for `bin_engine` and the other functions it uses.
