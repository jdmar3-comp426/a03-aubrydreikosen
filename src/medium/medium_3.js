import mpg_data from "./data/mpg_data.js";

/*
mpg_data is imported for you but that is for testing purposes only. All of the functions should use
a car_data param that is supplied as the first parameter.

As you write these functions notice how they could possibly be chained together to solve more complicated
queries.
 */

/**
 * @param {array} car_data - an instance of mpg_data that should be used for filtering.
 * @param minHorsepower {number}
 * @param minTorque {number}
 *
 * @return {array} An array of car objects with horsepower >= minHorsePower and torque >= minTorque
 * sorted by horsepower in descending order.
 *
 */
export function searchHighPower(car_data, minHorsepower, minTorque) {
    const allPossibleCars = car_data.filter(car_data => car_data.horsepower >= minHorsepower && 
        car_data.torque >= minTorque);
    const sorted = allPossibleCars.sort((a, b) => (a.horsepower > b.horsepower) ? -1 : 1)
    return sorted;
}


/**
 * @param {array} car_data
 * @param minCity
 * @param minHighway
 *
 *
 * @return {array} An array of car objects with highway_mpg >= minHighway and city_mpg >= minCity
 * sorted by highway_mpg in descending order
 *
 */
export function searchMpg(car_data, minCity, minHighway) {
    const allPossibleCars = car_data.filter(car_data => car_data.highway_mpg >= minHighway && 
        car_data.city_mpg >= minCity);
    const sorted = allPossibleCars.sort((a, b) => (a.highway_mpg > b.highway_mpg) ? -1 : 1)
    return sorted;
}


/**
 * Find all cars where 'id' contains the search term below.
 * Sort the results so that if the term appears earlier in the string
 * it will appear earlier in the list. Make sure searching and sorting ignores case.
 * @param car_data
 * @param searchTerm A string to that is used for searching
 * @returns {[]} array of cars
 */

//tolowerCase is not a thing
export function searchName(car_data, searchTerm) {
    var foundCars = car_data.filter(s => s.includes(searchTerm))
    //still need to sort
    return foundCars;
}


/**
 * Find all cars made in the years asked for.
 * Sort the results by year in descending order.
 *
 * @param car_data
 * @param {number[]} years - array of years to be included in the results e.g. [2010, 2012]
 * @returns {[]} an array of car objects
 */

export function searchByYear(car_data, years) {
    let result = [];
    for( let i = 0; i < years.length; i++) {
        let currentYear = years[i];
        const allCarsCurrentYear = car_data.filter(car_data => car_data.year == currentYear);
        result = result.concat(allCarsCurrentYear);
    }
    const sorted = result.sort((a, b) => (a.year > b.year) ? -1 : 1)
    return sorted;

}