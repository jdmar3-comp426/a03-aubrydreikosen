import mpg_data from "./data/mpg_data.js";
import { getStatistics } from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */

export const allCarStats = {
    avgMpg: {
        'city': findAvg(mpg_data.map(function(car) {
            return car.city_mpg
        })),
        'highway': findAvg(mpg_data.map(function(car) {
            return car.highway_mpg
        }))
    },
    allYearStats: getStatistics(mpg_data.map(function(car) {
        return car.year
    })),
    ratioHybrids: findRatio(mpg_data.map(function(car) {
        return car.hybrid
    })),
};

//helper function for avgMpg
export function findAvg(mpg_array) {
    const summing = (previous, current) => previous + current;
    return (mpg_array.reduce(summing)) / (mpg_array.length);
}

//helper functions for ratioHybrids
//ratio hybrids is off by a bit
export function findRatio(array) {
    let length = array.length;
    let hybrid = 0;
    for (let i = 0; i < length; i++) {
        if (array[i]) {
            hybrid++;
        }
    }
    return hybrid / length;
}


/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *          1. for each make of car-search in mpg_data for that make and check to see if it is a hybrid
 *              1a. if it is a hybrid add id to array
 *              1b. if not dont add it to the array
 *          2. check to see if there are 0 hybrids if so break out of loop and just don't add this one to array
 *          3. sort by each elements.hybrids.length 
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */
export const moreStats = {
    makerHybrids: findMakerHybrids(mpg_data.map(function(car) {
        return car.city_mpg
    }).filter(function(value, index, self) {
        return self.indexOf(value) === index;
      }),mpg_data.filter(mpg_data => mpg_data.hybrid == true)),
    avgMpgByYearAndHybrid: findSubAvg(),
};



//makerHybrids helper function 
// param: array of unique makes of cars, array of all car objects that are hybrids
    //1. using loop go through each make 
        // for each make 
            // find all cars in mpg_data that are that make 
            // add that car to an object titled that make of car
        // if array is empty then go continue into next interation of loop otherwise-
             // add the make object into result object 
    // sort result object by length of array associated with each key
    //return result
export function findMakerHybrids(uniqueCarModels, allHybridCars){
    const result = new Object();
    for (let i = 0; i < uniqueCarModels.length; i++) {
        let make = uniqueCarModels[i];
        const makeHybrids = allHybridCars.filter(allHybridCars => allHybridCars.make == make);
        if(makeHybrids.length == 0){
            continue;
        } else {
            result[make] = makeHybrids;
        }
    }
    //need to sort still
    return result;
}




//avgMpgByYearAndHybrid code - this can for sure be made simpler work on that (that is if it even works)
export function findSubAvg() {
    let year = 2009;
    const result = new Object();
    /*
    const year1 = new Object();
    const year2 = new Object();
    const year3 = new Object();
    */
    while( year < 2013) {
        const thisYear = mpg_data.filter(mpg_data => mpg_data.year == year);
        const thisYearHybrid = thisYear.filter(thisYear => thisYear.hybrid == true);
        const thisYearNonHybrid = thisYear.filter(thisYear => thisYear.hybrid == false);
        let hybridCity =  findAvg(thisYearHybrid.map(function(car) {
            return car.city_mpg
        }))
        let hybridHighway =  findAvg(thisYearHybrid.map(function(car) {
            return car.highway_mpg
        }))
        let nonHybridCity = findAvg(thisYearNonHybrid.map(function(car) {
            return car.city_mpg
        }))
        let nonHybridHighway = findAvg(thisYearNonHybrid.map(function(car) {
            return car.highway_mpg
        }))
        const hybridAvg = {city: hybridCity, highway: hybridHighway};
        const nonHybridAvg = {city: nonHybridCity, highway: nonHybridHighway};
        result[year] = {hybrid: hybridAvg, notHybrid: nonHybridAvg};
        /*
        if ( year == 2010) {
           year1.hybrid = hybridAvg;
           year1.notHybrid = nonHybridAvg;
        }
        if( year == 2011) {
            year2.hybrid = hybridAvg;
            year2.notHybrid = nonHybridAvg;
        }
        if( year == 2012){
            year3.hybrid = hybridAvg;
            year3.notHybrid = nonHybridAvg;
        }
        */
        year ++;
    }
    //const result = {2010: year1, 2011: year2, 2012: year3};
    return result;
}