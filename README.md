AdaStats
========

Embarrassingly basic, yet flexible statistics library focused around finding the minimum, maximum, mean, variance, or deviation of a set. It also allows binning a series into a set of ranges and applying a statistical function to those ranges.

If you have data which is more structured and need to pluck data off it, this library can save that step. It uses mathematical projection operators to perform statistics on the image of your data. This means you don't have to make a separate copy. It does however mean one must deal with an extra function call each time the preimage(the unaltered application data) is iterated over. This is the standard trade off of using less memory for a trade-off in execution speed. Of course, this overhead is typically negligible and adds a lot of flexibility.

If you need more functionality I highly recommend [Simple Statistics](https://simplestatistics.org/). Keep in mind that library will require you to compute the image of your data (so it's just a flat array), before it can operate on it.
