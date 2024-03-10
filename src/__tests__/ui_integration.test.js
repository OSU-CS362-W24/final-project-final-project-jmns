/**
* @jest-environment jsdom
*/

/*
    UI Integration Test
    Tests the UI using line.html and line.js (however functionally the same as scatter and bar)
    By Justin Pham
*/

const chartStorage = require(`${__dirname}/../lib/chartStorage`)

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

/*
    This project has a really annoying quirk where
    even when I reset the html and js files, the input
    areas do not, created this function to manually clear
    it to reset it.
*/
function resetInputValues(){

    // Reset All Inputs
    currentChartData = {}
    chartStorage.updateCurrentChartData(currentChartData)
}

beforeEach(() => {
    resetInputValues()

    /*
        You can toggle which page in the website to test with
        Although each page (line, bar, scatter) is functionally the same
    */

    initDomFromFiles(
        `${__dirname}/../line/line.html`,
        `${__dirname}/../line/line.js`
    )

    // initDomFromFiles(
    //     `${__dirname}/../bar/bar.html`,
    //     `${__dirname}/../bar/bar.js`
    // )

    // initDomFromFiles(
    //     `${__dirname}/../scatter/scatter.html`,
    //     `${__dirname}/../scatter/scatter.js`
    // )
})

/**********************************************
*
*
* Adding values in the chart builder
*
*
**********************************************/

// Adds another input pair to the list of input
test("Adds another input pair to the list of input", async function () {

    const user = userEvent.setup()

    // Check that there are only two inputs avaliable (1 X, 1 Y)
    var dataXInputs = domTesting.queryAllByLabelText(document, "X")
    var dataYInputs = domTesting.queryAllByLabelText(document, "Y")

    expect(dataXInputs).toHaveLength(1)
    expect(dataYInputs).toHaveLength(1)

    // Get Button to add input pair
    const plusButton = domTesting.getByRole(document, "button", {name : "+"})

    // Click Button 
    await user.click(plusButton)

    // Check that there are now 4 inputs avaliable (2 X, 2 Y)
    dataXInputs = domTesting.queryAllByLabelText(document, "X")
    dataYInputs = domTesting.queryAllByLabelText(document, "Y")

    expect(dataXInputs).toHaveLength(2)
    expect(dataYInputs).toHaveLength(2)
})


// Old values are presesrved correctly when another input pair is added
test("Old values are presesrved correctly when another input pair is added", async function () {

    const user = userEvent.setup()

    const xValue = 2
    const yValue = 5

    // Get the two inputs avaliable and add values to them
    const dataXInputs = domTesting.queryAllByLabelText(document, "X")
    const dataYInputs = domTesting.queryAllByLabelText(document, "Y")

    expect(dataXInputs).toHaveLength(1)
    expect(dataYInputs).toHaveLength(1)

    await user.type(dataXInputs[0], `${xValue}`)
    await user.type(dataYInputs[0], `${yValue}`)

    expect(dataXInputs[0]).toHaveValue(xValue)
    expect(dataYInputs[0]).toHaveValue(yValue)

    // Get Button to add input pair
    const plusButton = domTesting.getByRole(document, "button", {name : "+"})

    // Click Button 
    await user.click(plusButton)

    // Assert that the two inputs have the same value
    expect(dataXInputs[0]).toHaveValue(xValue)
    expect(dataYInputs[0]).toHaveValue(yValue)

})

// New input pair can be typed into when another input pair is added
test("New input pair can be typed into when another input pair is added", async function () {

    const user = userEvent.setup()

    const value = 9

    // Get Button to add input pair
    const plusButton = domTesting.getByRole(document, "button", {name : "+"})

    // Click Button 
    await user.click(plusButton)
    
    // Get all inputs avaliable
    const dataXInputs = domTesting.queryAllByLabelText(document, "X")
    const dataYInputs = domTesting.queryAllByLabelText(document, "Y")

    // Assert that new inputs have been created
    expect(dataXInputs).toHaveLength(2)
    expect(dataYInputs).toHaveLength(2)

    // Type value into all inputs (new and old)
    await user.type(dataXInputs[0], `${value}`)
    await user.type(dataXInputs[1], `${value}`)
    await user.type(dataYInputs[0], `${value}`)
    await user.type(dataYInputs[1], `${value}`)

    // Assert that all inputs accept inputs
    expect(dataXInputs[0]).toHaveValue(value)
    expect(dataXInputs[1]).toHaveValue(value)
    expect(dataYInputs[0]).toHaveValue(value)
    expect(dataYInputs[1]).toHaveValue(value)
})

// Multiple input pairs can be added
test("Multiple input pairs can be added", async function () {

    const user = userEvent.setup()

    // Get Button to add input pair
    const plusButton = domTesting.getByRole(document, "button", {name : "+"})

    // Click Button 
    await user.click(plusButton)
    
    // Get all inputs avaliable
    var dataXInputs = domTesting.queryAllByLabelText(document, "X")
    var dataYInputs = domTesting.queryAllByLabelText(document, "Y")

    // Assert that new inputs have been created
    expect(dataXInputs).toHaveLength(2)
    expect(dataYInputs).toHaveLength(2)

    // Click Button Again
    await user.click(plusButton)
    await user.click(plusButton)
    await user.click(plusButton)
    await user.click(plusButton)
    await user.click(plusButton)
    await user.click(plusButton)
    await user.click(plusButton)
    await user.click(plusButton)
    await user.click(plusButton)
    await user.click(plusButton)
    await user.click(plusButton)
    await user.click(plusButton)
    await user.click(plusButton)
    await user.click(plusButton)
    await user.click(plusButton)

    // Get all inputs avaliable
    dataXInputs = domTesting.queryAllByLabelText(document, "X")
    dataYInputs = domTesting.queryAllByLabelText(document, "Y")

    // Assert that more inputs have been created
    expect(dataXInputs).toHaveLength(17)
    expect(dataYInputs).toHaveLength(17)

})

/**********************************************
*
*
* Alerts displayed for missing chart data
*
*
**********************************************/

// No Values in Values section ------------------------------

// Error message pops up when missing XY values
test("Error message pops up when missing XY values", async function () {

    const user = userEvent.setup()

    // Get Generate Chart Button
    const generateChartButton = domTesting.getByRole(document, "button", {name : "Generate chart"})

    // Create a spy for the alert
    const alert = jest.spyOn(window, "alert")

    await user.click(generateChartButton)

    // Assert that a message/alert appeared on the screen to be read
    expect(alert).toHaveBeenCalledTimes(1)

    alert.mockRestore()
})

// Error message displays the message Error: No data specified!
test("Error message displays the message Error: No data specified!", async function () {

    const user = userEvent.setup()

    const errorMessage = "Error: No data specified!"

    // Get Generate Chart Button
    const generateChartButton = domTesting.getByRole(document, "button", {name : "Generate chart"})

    // Create a spy for the alert
    const alert = jest.spyOn(window, "alert")

    await user.click(generateChartButton)

    // Assert that a message/alert appeared on the screen to be read
    expect(alert).toHaveBeenCalledTimes(1)

    // Assert that the error displays the specified message
    const alertMessage = alert.mock.lastCall[0]
    expect(alertMessage).toEqual(errorMessage)

    alert.mockRestore()
})

// No Labels in Labels section ------------------------------

// Missing both labels pops up an error message

// Missing x label pops up an error message ? 

// Missing y label pops up an error message ?

// Error message displays the message Error: Must specify a label for both X and Y!

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
