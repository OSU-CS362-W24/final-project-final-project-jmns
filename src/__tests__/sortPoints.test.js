const sortPoints = require('../lib/sortPoints')

//Test #1
test("Sorts array of X/Y points by ascending X value", function() {

    //ARRANGE
    //define an input array of values
    const input = [ { x: 3, y: 2 }, { x: 1, y: 5 }, { x: 4, y: 1 } ];

    //define an array of the sorted input values as the expected output
    const expectedOutput = [ { x: 1, y: 5 }, { x: 3, y: 2 }, { x: 4, y: 1 } ];
    
    //ACT
    //call the function to sort the input and store the sorted array in the result
    const result = sortPoints(input);

    //ASSERT
    //expect the result to be equal to the expected output
    expect(result).toEqual(expectedOutput);
});

//Test #2
test("Sorts an empty array with a single empty value", function() {

    //ARRANGE
    //define an empty input array of values
    const input = [];

    //define an empty array as the expected output
    const expectedOutput = [];
    
    //ACT
    //call the sort function on the empty array and store the result
    const result = sortPoints(input);

    //ASSERT
    //expect the result to be equal to the expected output
    expect(result).toEqual(expectedOutput);
});

//Test #3
test("Sorts an empty array with multiple empty values", function() {

    //ARRANGE
    //define an empty input array of values
    const input = [ { }, { }] ;

    //define an empty array as the expected output
    const expectedOutput = [ { }, { } ];
    
    //ACT
    //call the sort function on the empty array and store the result
    const result = sortPoints(input);

    //ASSERT
    //expect the result to be equal to the expected output
    expect(result).toEqual(expectedOutput);
});

//Test #4
test("Sorts an array of a single positive value", function() {

    //ARRANGE

    //define the input as a single X/Y data point
    const input = [ { x: 1, y: 1 } ];

    //define the output as a matching X/Y data point
    const expectedOutput = [ { x: 1, y: 1 } ];
    
    //ACT
    //call the sort function on the array and store it into the output
    const result = sortPoints(input);

    //ASSERT
    //expect the result to be equal to the expected output
    expect(result).toEqual(expectedOutput);
});

//Test #5
test("Sorts an array of identical values", function() {

    //ARRANGE
    //define the input as duplicate X/Y data points
    const input = [ { x: 1, y: 1 }, { x: 1, y: 1 } ];

    //define the output as the matching case
    const expectedOutput = [ { x: 1, y: 1 }, { x: 1, y: 1 } ];
    
    //ACT
    //call the sort function on the array and store it into the output
    const result = sortPoints(input);

    //ASSERT
    //expect the result to be equal to the expected output; unchanged
    expect(result).toEqual(expectedOutput);
});

//Test #6
test("Sorts an array of identical Y values", function() {

    //ARRANGE

    //define the output of indentical Y values but different X values
    const input = [ { x: 2, y: 1 }, { x: 1, y: 1 } ];

    //define the input of the sorted result
    const expectedOutput = [ { x: 1, y: 1 }, { x: 2, y: 1 } ];
    
    //ACT
    //call the sort function on the array and store it into the output
    const result = sortPoints(input);

    //ASSERT
    //expect the result to be equal to the expected output
    expect(result).toEqual(expectedOutput);
});


//Test #7
test("Sorts an already sorted array", function() {

    //ARRANGE
    //define an input array of values alerady sorted
    const input = [ { x: 1, y: 5 }, { x: 3, y: 2 }, { x: 4, y: 1 } ];

    //define an expected output array of sorted values (will be the same as the input array)
    const expectedOutput = [ { x: 1, y: 5 }, { x: 3, y: 2 }, { x: 4, y: 1 } ];
    
    //ACT
    //call the sort function on the sorted input array and store the result
    const result = sortPoints(input);

    //ASSERT
    //expect the result to be equal to the expected output (unchanged)
    expect(result).toEqual(expectedOutput);
});


//Test #8
test("Sorts an array with the same X values (prioritizes the larger y as a tie breaker)", function() {

    //ARRANGE
    //define an input array with duplicate X values
    const input = [ { x: 1, y: 5 }, { x: 1, y: 2 }, { x: 1, y: 1 } ];

    //define an expected output array of sorted values accounting for the duplicate X (selects the larger Y)
    const expectedOutput = [ { x: 1, y: 5 }, { x: 1, y: 2 }, { x: 1, y: 1 } ];
    
    //ACT
    //call the sort function on the sorted input array and store the result
    const result = sortPoints(input);

    //ASSERT
    //expect the result to be equal to the expected output
    expect(result).toEqual(expectedOutput);
});

//Test #9
test("First verification that an array an containing alphabetic X values will not be sorted", function() {

    //ARRANGE

    //define the input array and include an alphabetic data point
    const input = [ { x: 2, y: 1 }, { x: 'a', y: 1 } ];

    //define the output array as unchanged fromt the input array
    const expectedOutput = [ { x: 2, y: 1 }, { x: 'a', y: 1 } ];
    
    //ACT
    //call the sort function on the sorted input array and store the result
    const result = sortPoints(input);

    //ASSERT
    //expect the result to equal the expected output
    expect(result).toEqual(expectedOutput);
});

//Test #10
test("Second verification an array an containing alphabetic X values will not be sorted", function() {

    //ARRANGE
    //define the input array with the alphabetic X value coming first
    const input = [ { x: 'a', y: 1 }, { x: 2, y: 1 } ];

    //define the output array as unchanged
    const expectedOutput = [ { x: 'a', y: 1 }, { x: 2, y: 1 } ];
    
    //ACT
    //call the sort function on the input array and store the results
    const result = sortPoints(input);

    //ASSERT
    //expect the result to equal the expected output
    expect(result).toEqual(expectedOutput);
});

//Test #11
test("Verification an array an containing alphabetic Y values and matching numerical X values will not be sorted", function() {

    //ARRANGE
    //define the input array with matchinhg X values and an alphabetical Y values 
    const input = [ { x: 2, y: 1 }, { x: 2, y: 'a' }, { x: 2, y: 2 }, ];

    //define the output array as the same as the input array
    const expectedOutput = [ { x: 2, y: 1 }, { x: 2, y: 'a' }, { x: 2, y: 2 }, ];
    
    //ACT
    //call the sort function on the input array and store the results
    const result = sortPoints(input);

    //ASSERT
    //expect the result to equal the expected output
    expect(result).toEqual(expectedOutput);
});

//Test #12
test("Sorts array containing unique X values and alphabetic Y values", function() {

    //ARRANGE
    //define an unsorted input array of unique X values and alphabetic Y values
    const input = [ { x: 1, y: 'b' }, { x: 3, y: 'c' }, { x: 1, y: 'a' } ];

    //define the expected output sorted by the numeric X values
    const expectedOutput = [ { x: 1, y: 'b' }, { x: 1, y: 'a' }, { x: 3, y: 'c' } ];
    
    //ACT
    //call the sort function on the input array and store the results
    const result = sortPoints(input);

    //ASSERT
    //expect the result to equal the expected output
    expect(result).toEqual(expectedOutput);
});

//Test #13
test("Sorts negative integer values for X", function() {

    //ARRANGE
    //define an unsorted input array of negative X values and matching Y values
    const input = [ { x: -1, y: 1 }, { x: -2, y: 1 }, { x: -3, y: 1 } ];

    //define the sorted output array with the X values sorted in ascending order
    const expectedOutput = [ { x: -3, y: 1 }, { x: -2, y: 1 }, { x: -1, y: 1 } ];
    
    //ACT
    //call the sort function on the input array and store the results
    const result = sortPoints(input);

    //ASSERT
    //expect the result to equal the expected output
    expect(result).toEqual(expectedOutput);
});


//Test #14
test("Does not sort negative integer values for Y when there are positive values for X", function() {

    //ARRANGE
    //define an input array of identical X values and unique Y values
    const input = [ { x: 1, y: -3 }, { x: 1, y: -1 }, { x: 1, y: -2 } ];

    //define the expected output identical to the input array 
    const expectedOutput = [ { x: 1, y: -3 }, { x: 1, y: -1 }, { x: 1, y: -2 } ];
    
    //ACT
    //call the sort function on the input array and store the results
    const result = sortPoints(input);

    //ASSERT
    //expect the result to equal the expected output
    expect(result).toEqual(expectedOutput);
});

//Test #15
test("Sorts negative integer values for both X and Y values", function() {

    //ARRANGE

    //define the unsorted input array of negative values for X and Y values
    const input = [ { x: -1, y: -1 }, { x: -2, y: -2 }, { x: -3, y: -3 }, { x: -3, y: -2} ];

    //define the expected output as the sorted array sorted with X and Y values in ascending order
    const expectedOutput = [ { x: -3, y: -3 }, { x: -3, y: -2}, { x: -2, y: -2 }, { x: -1, y: -1 } ];
    
    //ACT
    //call the sort function on the input array and store the results
    const result = sortPoints(input);

    //ASSERT
    //expect the result to equal the expected output
    expect(result).toEqual(expectedOutput);
});

//Test #16
test("Sorts an array with values of 0 for both X and Y values", function() {

    //ARRANGE
    const input = [ { x: 0, y: 0 }, { x: 0, y: 0 } ];
    const expectedOutput = [ { x: 0, y: 0 }, { x: 0, y: 0 } ];
    
    //ACT
    //call the sort function on the input array and store the results
    const result = sortPoints(input);

    //ASSERT
    //expect the result to equal the expected output
    expect(result).toEqual(expectedOutput);
});

//Test #17
test("Sorts an array with floating point X values and integer Y values", function() {

    //ARRANGE

    //define the input array with floating point X values and integer Y values
    const input = [ { x: 2.5, y: 1 }, { x: 1.0, y: 2 }, {x: -5.6, y: 3} ];

    //define the output array with the floating point X values sorted in ascending order
    const expectedOutput = [ {x: -5.6, y: 3}, { x: 1.0, y: 2 }, { x: 2.5, y: 1 } ];
    
    //ACT
    //call the sort function on the input array and store the results
    const result = sortPoints(input);

    //ASSERT
    //expect the result to equal the expected output
    expect(result).toEqual(expectedOutput);
});

//Test #18
test("Does not sort an array with duplicate integer X values and floating point Y values", function() {

    //ARRANGE

    //define the input array with integer X values and floating point Y values 
    const input = [ { x: 1, y: 2.5 }, { x: 1, y: 1.6 } ];

    //define the output array as the same as the input
    const expectedOutput = [ { x: 1, y: 2.5 }, { x: 1, y: 1.6 } ];
    
    //ACT
    //call the sort function on the input array and store the results
    const result = sortPoints(input);

    //ASSERT
    //expect the result to equal the expected output
    expect(result).toEqual(expectedOutput);
});

//Test #19
test("Sorts an array with floating point X and Y values", function() {

    //ARRANGE

    //define the input array with floating point X and Y values with the input array as unsorted
    const input = [ { x: 3.3, y: 4.4 }, { x: 2.2, y: 6.6 } ];

    //define the expected output sorted by X values in ascending order
    const expectedOutput = [ { x: 2.2, y: 6.6 }, { x: 3.3, y: 4.4 } ];
    
    //ACT
    //call the sort function on the input array and store the results
    const result = sortPoints(input);

    //ASSERT
    //expect the result to equal the expected output
    expect(result).toEqual(expectedOutput);
});

//Test #20
test("Does not sort an array with an empty X value", function() {

    //ARRANGE

    //define an input array with only the Y values defined (unsorted)
    const input = [ { y: 1 }, { y: 0 } ];

    //define the output array as unchanged
    const expectedOutput = [ { y: 1 }, { y: 0 } ];
    
    //ACT
    //call the sort function on the input array and store the results
    const result = sortPoints(input);

    //ASSERT
    //expect the result to equal the expected output
    expect(result).toEqual(expectedOutput);
});

//Test #21
test("Sorts an array with an empty Y value", function() {

    //ARRANGE
    
    //define an input array with only the X values define (unsorted)
    const input = [ { x: 1 }, { x: 0} ];

    //define the oputput array sorted in ascending order 
    const expectedOutput = [ { x: 0 }, { x: 1} ];
    
    //ACT
    //call the sort function on the input array and store the results
    const result = sortPoints(input);

    //ASSERT
    //expect the result to equal the expected output
    expect(result).toEqual(expectedOutput);
});