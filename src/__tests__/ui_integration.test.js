/**
* @jest-environment jsdom
*/

/*
    UI Integration Test
    Tests the UI using line.html and line.js (however functionally the same as scatter and bar)
    By Justin Pham
*/

const fs = require("fs")
require('@testing-library/jest-dom')
const domTesting = require('@testing-library/dom')
const userEvent = require("@testing-library/user-event").default

function initDomFromFiles(htmlPath, jsPath) {
    const html = fs.readFileSync(htmlPath, 'utf8')
    document.open()
    document.write(html)
    document.close()
    jest.isolateModules(function () {
        require(jsPath)
        })
}



/**********************************************
*
*
* Adding values in the chart builder
*
*
**********************************************/

// Adds another input pair

// Old values are presesrved correctly

// New input pair can be typed into

// Multiple input pairs can be added

/**********************************************
*
*
* Alerts displayed for missing chart data
*
*
**********************************************/

// No Values in Values section ------------------------------

// Error message pops up when missing X Y values

// Error message displays the message Error: No data specified!

// Error message able to be closed out of (using the OK button)

// No Labels in Labels section ------------------------------

// Missing both labels pops up an error message

// Missing x label pops up an error message ? 

// Missing y label pops up an error message ?

// Error message displays the message Error: Must specify a label for both X and Y!

// Error message able to be closed out of (using the OK button)


/**********************************************
*
*
* Clearing chart data
*
*
**********************************************/

// Clearing chart data reverts Chart Color to default color

// Clearing chart data clears Chart Title

// Clearing chart data clears Data Labels

// Clearing chart data reverts it to having only a pair of inputs for values

// Clearing chart data clears data from values

/**********************************************
*
*
* Data correctly sent to chart generation function
*
*
**********************************************/

// Generate chart button sends the correct data to generateChartImg()

// Generate chart button recieves an image
