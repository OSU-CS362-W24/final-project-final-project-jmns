/**
* @jest-environment jsdom
*/

/*
    UI Integration Test
    Tests the UI using line.html and line.js (however functionally the same as scatter and bar)
    By Justin Pham
*/

// Create a window.alert for the js to call to
// Line referenced from: https://stackoverflow.com/a/55909840 by JRJurman
window.alert = jest.fn()

// Used to reset the local storage for each individual test
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

    // Clears the alert window of any alerts/message it gets
    // Line referenced from: https://stackoverflow.com/a/55909840 by JRJurman
    window.alert.mockClear()        

    resetInputValues()

    /*
        You can toggle which page in the website to test with
        Although each page (line, bar, scatter) is functionally the same

        WHEN TESTING THIS PAGE USING THE BAR FILES, BE AWARE THAT THE
        X VALUE INPUT HAS TYPE TEXT RATHER THAN TYPE NUMBER WHICH CAUSES
        TESTS 2 and 3 TO BE BROKEN. 
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

afterEach(() => {
    jest.restoreAllMocks()
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

// No Values in Values and Label section --------------------

// Error message pops up when missing values
test("Error message pops up when missing values Error: No data specified!", async function () {

    const user = userEvent.setup()

    const errorMessage = "Error: No data specified!"

    // Get Generate Chart Button
    const generateChartButton = domTesting.getByRole(document, "button", {name : "Generate chart"})

    // Create a spy for the alert
    const alert = jest.spyOn(window, "alert")

    await user.click(generateChartButton)

    // Assert that a message/alert appeared on the screen to be read
    expect(alert).toHaveBeenCalledTimes(1)

    const alertMessage = alert.mock.lastCall[0]
    expect(alertMessage).toEqual(errorMessage)

    alert.mockRestore()
})

// No Values in Values section ------------------------------

// Error message displays the message Error: No data specified! when missing XY values
test("Error message displays the message Error: No data specified! when missing XY values", async function () {

    const user = userEvent.setup()

    const errorMessage = "Error: No data specified!"

    // Fill in values for label section
    const xLabel = domTesting.getByLabelText(document, "X label")
    await user.type(xLabel, "dummy")

    const yLabel = domTesting.getByLabelText(document, "Y label")
    await user.type(yLabel, "dummy")

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
test("Missing both labels pops up an error message Error: Must specify a label for both X and Y!", async function () {

    const user = userEvent.setup()

    const errorMessage = "Error: Must specify a label for both X and Y!"

    // Fill in values for values section
    const dummy = '5'
    const xInput = domTesting.getByLabelText(document, "X")
    await user.type(xInput, dummy)

    const yInput = domTesting.getByLabelText(document, "Y")
    await user.type(yInput, dummy)

    // Get Generate Chart Button
    const generateChartButton = domTesting.getByRole(document, "button", {name : "Generate chart"})

    // Create a spy for the alert
    const alert = jest.spyOn(window, "alert")

    await user.click(generateChartButton)

    // Assert that a message/alert appeared on the screen to be read
    expect(alert).toHaveBeenCalledTimes(1)

    const alertMessage = alert.mock.lastCall[0]
    expect(alertMessage).toEqual(errorMessage)

    alert.mockRestore()
})

// Missing x label pops up an error message
test("Missing x label pops up an error message Error: Must specify a label for both X and Y!", async function () {

    const user = userEvent.setup()

    const errorMessage = "Error: Must specify a label for both X and Y!"

    // Fill in values for values section
    const dummy = '5'
    const xInput = domTesting.getByLabelText(document, "X")
    await user.type(xInput, dummy)

    const yInput = domTesting.getByLabelText(document, "Y")
    await user.type(yInput, dummy)

    const yLabel = domTesting.getByLabelText(document, "Y label")
    await user.type(yLabel, "dummy")

    // Get Generate Chart Button
    const generateChartButton = domTesting.getByRole(document, "button", {name : "Generate chart"})

    // Create a spy for the alert
    const alert = jest.spyOn(window, "alert")

    await user.click(generateChartButton)

    // Assert that a message/alert appeared on the screen to be read
    expect(alert).toHaveBeenCalledTimes(1)

    const alertMessage = alert.mock.lastCall[0]
    expect(alertMessage).toEqual(errorMessage)

    alert.mockRestore()
})

// Missing y label pops up an error message
test("Missing y label pops up an error message Error: Must specify a label for both X and Y!", async function () {

    const user = userEvent.setup()

    const errorMessage = "Error: Must specify a label for both X and Y!"

    // Fill in values for values section
    const dummy = '5'
    const xInput = domTesting.getByLabelText(document, "X")
    await user.type(xInput, dummy)

    const yInput = domTesting.getByLabelText(document, "Y")
    await user.type(yInput, dummy)

    const xLabel = domTesting.getByLabelText(document, "X label")
    await user.type(xLabel, "dummy")

    // Get Generate Chart Button
    const generateChartButton = domTesting.getByRole(document, "button", {name : "Generate chart"})

    // Create a spy for the alert
    const alert = jest.spyOn(window, "alert")

    await user.click(generateChartButton)

    // Assert that a message/alert appeared on the screen to be read
    expect(alert).toHaveBeenCalledTimes(1)

    const alertMessage = alert.mock.lastCall[0]
    expect(alertMessage).toEqual(errorMessage)

    alert.mockRestore()
})

/**********************************************
*
*
* Clearing chart data
*
*
**********************************************/

// Clearing chart data reverts Chart Color to default color
test("Clearing chart data reverts Chart Color to default color", async function() {

    const user = userEvent.setup()

    /*
        Fill in dummy values for every input
    */
    const chartTitle = domTesting.getByLabelText(document, "Chart title")
    await user.type(chartTitle, "dummy")
    
    const xLabel = domTesting.getByLabelText(document, "X label")
    await user.type(xLabel, "dummy")
    
    const yLabel = domTesting.getByLabelText(document, "Y label")
    await user.type(yLabel, "dummy")
    
    const chartColor = domTesting.getByLabelText(document, "Chart color")
    
    // Line referenced from: https://github.com/testing-library/user-event/issues/423
    // No easy way to simulate picking a color from what I can find
    domTesting.fireEvent.input(chartColor, {target: {value: '#ff00ff'}})
    
    const plusButton = domTesting.getByRole(document, "button", {name : "+"})
    
    await user.click(plusButton)
    await user.click(plusButton)
    await user.click(plusButton)
    
    const dataXInputs = domTesting.queryAllByLabelText(document, "X")
    const dataYInputs = domTesting.queryAllByLabelText(document, "Y")
    
    const dummy = '5'
    await user.type(dataXInputs[0], dummy)
    await user.type(dataYInputs[0], dummy)
    await user.type(dataXInputs[1], dummy)
    await user.type(dataYInputs[1], dummy)
    await user.type(dataXInputs[2], dummy)
    await user.type(dataYInputs[2], dummy)

    // Get the clear chart button
    const clearChartData = domTesting.getByRole(document, "button", {name : "Clear chart data"})

    await user.click(clearChartData)

    // Assert that the Color is back to the default color #ff4500
    expect(chartColor).toHaveValue('#ff4500')
})

// Clearing chart data clears Chart Title
test("Clearing chart data clears Chart Title", async function() {

    const user = userEvent.setup()

    /*
        Fill in dummy values for every input
    */
    const chartTitle = domTesting.getByLabelText(document, "Chart title")
    await user.type(chartTitle, "dummy")
    
    const xLabel = domTesting.getByLabelText(document, "X label")
    await user.type(xLabel, "dummy")
    
    const yLabel = domTesting.getByLabelText(document, "Y label")
    await user.type(yLabel, "dummy")
    
    const chartColor = domTesting.getByLabelText(document, "Chart color")
    
    // Line referenced from: https://github.com/testing-library/user-event/issues/423
    // No easy way to simulate picking a color from what I can find
    domTesting.fireEvent.input(chartColor, {target: {value: '#ff00ff'}})
    
    const plusButton = domTesting.getByRole(document, "button", {name : "+"})
    
    await user.click(plusButton)
    await user.click(plusButton)
    await user.click(plusButton)
    
    const dataXInputs = domTesting.queryAllByLabelText(document, "X")
    const dataYInputs = domTesting.queryAllByLabelText(document, "Y")
    
    const dummy = '5'
    await user.type(dataXInputs[0], dummy)
    await user.type(dataYInputs[0], dummy)
    await user.type(dataXInputs[1], dummy)
    await user.type(dataYInputs[1], dummy)
    await user.type(dataXInputs[2], dummy)
    await user.type(dataYInputs[2], dummy)

    // Get the clear chart button
    const clearChartData = domTesting.getByRole(document, "button", {name : "Clear chart data"})

    await user.click(clearChartData)

    // Assert that the title is empty
    expect(chartTitle).not.toHaveValue()
})

// Clearing chart data clears Data Labels
test("Clearing chart data clears Data Labels", async function() {

    const user = userEvent.setup()

    /*
        Fill in dummy values for every input
    */
    const chartTitle = domTesting.getByLabelText(document, "Chart title")
    await user.type(chartTitle, "dummy")
    
    const xLabel = domTesting.getByLabelText(document, "X label")
    await user.type(xLabel, "dummy")
    
    const yLabel = domTesting.getByLabelText(document, "Y label")
    await user.type(yLabel, "dummy")
    
    const chartColor = domTesting.getByLabelText(document, "Chart color")
    
    // Line referenced from: https://github.com/testing-library/user-event/issues/423
    // No easy way to simulate picking a color from what I can find
    domTesting.fireEvent.input(chartColor, {target: {value: '#ff00ff'}})
    
    const plusButton = domTesting.getByRole(document, "button", {name : "+"})
    
    await user.click(plusButton)
    await user.click(plusButton)
    await user.click(plusButton)
    
    const dataXInputs = domTesting.queryAllByLabelText(document, "X")
    const dataYInputs = domTesting.queryAllByLabelText(document, "Y")
    
    const dummy = '5'
    await user.type(dataXInputs[0], dummy)
    await user.type(dataYInputs[0], dummy)
    await user.type(dataXInputs[1], dummy)
    await user.type(dataYInputs[1], dummy)
    await user.type(dataXInputs[2], dummy)
    await user.type(dataYInputs[2], dummy)

    // Get the clear chart button
    const clearChartData = domTesting.getByRole(document, "button", {name : "Clear chart data"})

    await user.click(clearChartData)

    // Assert that the data labels are empty
    expect(xLabel).not.toHaveValue()
    expect(yLabel).not.toHaveValue()
})

// Clearing chart data reverts it to having only a pair of inputs for values
test("Clearing chart data reverts it to having only a pair of inputs for values", async function() {

    const user = userEvent.setup()

    /*
        Fill in dummy values for every input
    */
    const chartTitle = domTesting.getByLabelText(document, "Chart title")
    await user.type(chartTitle, "dummy")
    
    const xLabel = domTesting.getByLabelText(document, "X label")
    await user.type(xLabel, "dummy")
    
    const yLabel = domTesting.getByLabelText(document, "Y label")
    await user.type(yLabel, "dummy")
    
    const chartColor = domTesting.getByLabelText(document, "Chart color")
    
    // Line referenced from: https://github.com/testing-library/user-event/issues/423
    // No easy way to simulate picking a color from what I can find
    domTesting.fireEvent.input(chartColor, {target: {value: '#ff00ff'}})
    
    const plusButton = domTesting.getByRole(document, "button", {name : "+"})
    
    await user.click(plusButton)
    await user.click(plusButton)
    await user.click(plusButton)
    
    var dataXInputs = domTesting.queryAllByLabelText(document, "X")
    var dataYInputs = domTesting.queryAllByLabelText(document, "Y")
    
    const dummy = '5'
    await user.type(dataXInputs[0], dummy)
    await user.type(dataYInputs[0], dummy)
    await user.type(dataXInputs[1], dummy)
    await user.type(dataYInputs[1], dummy)
    await user.type(dataXInputs[2], dummy)
    await user.type(dataYInputs[2], dummy)

    // Get the clear chart button
    const clearChartData = domTesting.getByRole(document, "button", {name : "Clear chart data"})

    await user.click(clearChartData)

    // Assert that there are only one pair of inputs for values
    dataXInputs = domTesting.queryAllByLabelText(document, "X")
    dataYInputs = domTesting.queryAllByLabelText(document, "Y")

    expect(dataXInputs).toHaveLength(1)
    expect(dataYInputs).toHaveLength(1)
})

// Clearing chart data clears data from values
test("Clearing chart data clears data from values", async function() {

    const user = userEvent.setup()

    /*
        Fill in dummy values for every input
    */
    const chartTitle = domTesting.getByLabelText(document, "Chart title")
    await user.type(chartTitle, "dummy")
    
    const xLabel = domTesting.getByLabelText(document, "X label")
    await user.type(xLabel, "dummy")
    
    const yLabel = domTesting.getByLabelText(document, "Y label")
    await user.type(yLabel, "dummy")
    
    const chartColor = domTesting.getByLabelText(document, "Chart color")
    
    // Line referenced from: https://github.com/testing-library/user-event/issues/423
    // No easy way to simulate picking a color from what I can find
    domTesting.fireEvent.input(chartColor, {target: {value: '#ff00ff'}})
    
    const plusButton = domTesting.getByRole(document, "button", {name : "+"})
    
    await user.click(plusButton)
    await user.click(plusButton)
    await user.click(plusButton)
    
    var dataXInputs = domTesting.queryAllByLabelText(document, "X")
    var dataYInputs = domTesting.queryAllByLabelText(document, "Y")
    
    const dummy = '5'
    await user.type(dataXInputs[0], dummy)
    await user.type(dataYInputs[0], dummy)
    await user.type(dataXInputs[1], dummy)
    await user.type(dataYInputs[1], dummy)
    await user.type(dataXInputs[2], dummy)
    await user.type(dataYInputs[2], dummy)

    // Get the clear chart button
    const clearChartData = domTesting.getByRole(document, "button", {name : "Clear chart data"})

    await user.click(clearChartData)

    // Assert that there are only one pair of inputs for values
    dataXInputs = domTesting.queryAllByLabelText(document, "X")
    dataYInputs = domTesting.queryAllByLabelText(document, "Y")

    expect(dataXInputs).toHaveLength(1)
    expect(dataYInputs).toHaveLength(1)

    expect(dataXInputs[0]).not.toHaveValue()
    expect(dataYInputs[0]).not.toHaveValue()
})

/**********************************************
*
*
* Data correctly sent to chart generation function
*
*
**********************************************/

const generateChartImg = require("../lib/generateChartImg")
// const generateChartFun = require("../chartBuilder/chartBuilder")

// Generate chart button sends the correct data to generateChartImg()
test("Generate chart button sends the correct data to generateChartImg()", async function() {

    const user = userEvent.setup()

    /*
        Fill in dummy values for every input
    */
    const chartTitle = domTesting.getByLabelText(document, "Chart title")
    await user.type(chartTitle, "dummy")
    
    const xLabel = domTesting.getByLabelText(document, "X label")
    await user.type(xLabel, "dummy")
    
    const yLabel = domTesting.getByLabelText(document, "Y label")
    await user.type(yLabel, "dummy")
    
    // const chartColor = domTesting.getByLabelText(document, "Chart color")
    
    // Line referenced from: https://github.com/testing-library/user-event/issues/423
    // No easy way to simulate picking a color from what I can find
    // domTesting.fireEvent.input(chartColor, {target: {value: '#ff00ff'}})
    
    const plusButton = domTesting.getByRole(document, "button", {name : "+"})
    
    await user.click(plusButton)
    await user.click(plusButton)
    await user.click(plusButton)
    
    var dataXInputs = domTesting.queryAllByLabelText(document, "X")
    var dataYInputs = domTesting.queryAllByLabelText(document, "Y")
    
    const dummy = '5'
    await user.type(dataXInputs[0], dummy)
    await user.type(dataYInputs[0], dummy)
    await user.type(dataXInputs[1], dummy)
    await user.type(dataYInputs[1], dummy)
    await user.type(dataXInputs[2], dummy)
    await user.type(dataYInputs[2], dummy)

    // const objectTest = { 'generateChartImg' : generateChartImg}

    // Create spy for generate chart
    const generateChartImgSpy = jest.spyOn(generateChartImg, 'generateChartImg')

    generateChartImgSpy['generateChartImg'] = jest.fn(() => {
        return "http://placekitten.com/480/480"
    })

    // generateChartImgSpy.mockImplementation(function () {
    //     return "http://placekitten.com/480/480"
    // })

    expect(chartTitle).toHaveValue()
    expect(xLabel).toHaveValue()
    expect(yLabel).toHaveValue()
    expect(dataXInputs[0]).toHaveValue()
    expect(dataYInputs[0]).toHaveValue()
    expect(dataXInputs[1]).toHaveValue()
    expect(dataYInputs[1]).toHaveValue()
    expect(dataXInputs[2]).toHaveValue()
    expect(dataYInputs[2]).toHaveValue()

    generateChartImg.generateChartImg()

    const generateChartButton = domTesting.getByRole(document, "button", {name : "Generate chart"})

    await user.click(generateChartButton)

    const chartImgSection = document.getElementById('chart-display')
    
    console.log(chartImgSection.innerHTML)

    expect(generateChartImgSpy).toHaveBeenCalledTimes(1)

    // expect(generateChartImgSpy).toHaveBeenCalledTimes(1)

    // generateChartImgSpy.mockRestore()
})

// test("test function", function () {

//     // const example = {'generateChartImg' : generateChartImg}

//     // const exampleSpy = jest.spyOn(example, 'generateChartImg')

//     // expect(generateChartImg("line", [{"x": 1, "y": 1}], "xLabel", "yLabel", "#ff4500")).toHaveValue()

//     // exampleSpy.mockImplementation(function () {
//     //     return "http://placekitten.com/480/480"
//     // })



// })

// Generate chart button recieves an image
