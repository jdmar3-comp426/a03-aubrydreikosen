import { variance } from "./data/stats_helpers.js";

/**
 * Gets the sum of an array of numbers.
 * @param array
 * @returns {*}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * prototype functions. Very useful
 */
export function getSum(array) {
    const summing = (previous, current) => previous + current;
    return array.reduce(summing);
}


/**
 * Calculates the median of an array of numbers.
 * @param {number[]} array
 * @returns {number|*}
 *
 * example:
 * let array = [3,2,5,6,2,7,4,2,7,5];
 * [2,2,2,3,4,5,5,6,7,7]
 * console.log(getMedian(array)); // 4.5
 */
export function getMedian(array) {
    var array1 = array.sort(function(a,b) {return a-b;});
    let length = array.length;
    let middle = Math.floor(length/2);
    if( length % 2 == 0) {
        return (array1[middle-1] + array1[middle])/2;
    } else {
        return array1[middle];
    }
}

/**
 * Calculates statistics (see below) on an array of numbers.
 * Look at the stats_helper.js file. It does variance which is used to calculate std deviation.
 * @param {number[]} array
 * @returns {{min: *, median: *, max: *, variance: *, mean: *, length: *, sum: *, standard_deviation: *}}
 *
 * example:
 * getStatistics([3,2,4,5,5,5,2,6,7])
 * {
  length: 9,
  sum: 39,
  mean: 4.333333333333333,
  median: 5,
  min: 2,
  max: 7,
  variance: 2.6666666666666665,
  standard_deviation: 1.632993161855452
 }
 */
export function getStatistics(array) {
    //change this to get rid of the spaces
    const array1 = array.sort(function(a,b) {return a-b;});
    let sum =  getSum(array);
    let length =  array.length;
    let min =  array1[0];
    let max = array1[array.length -1];
    let median =  getMedian(array); 
    let mean =  sum/length;
    let variance_num = variance(array,mean);
    let standard_deviation = Math.sqrt(variance_num);
    const result = {length: length, sum: sum, mean: mean, median: median, min: min, max: max, variance: variance_num, standard_deviation: standard_deviation};
    return result;
}