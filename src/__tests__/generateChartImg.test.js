/**
 * @jest-environment ./src/fixjsdomenvironment.js
*/

const fs = require("fs")
require("whatwg-fetch")
require("@testing-library/jest-dom")

function initDomFromFiles(htmlPath, jsPath) {
    const html = fs.readFileSync(htmlPath, 'utf8')
    document.open()
    document.write(html)
    document.close()
    jest.isolateModules(function () {
        require(jsPath)
    })
}

//import function from file
const generateChartImg = require("../lib/generateChartImg")

//tests do not need to cover error cases as per assingment instructions

test("The URL returned by generateChartImg for a line chart is not null", async function () {

    //ARRANGE
    initDomFromFiles(
        `${__dirname}/../index.html`,
        `${__dirname}/../lib/generateChartImg.js`
    )
    const type = 'line'
    const data = [{ x: 1, y: 2 }, { x: 2, y: 3 }]
    const xLabel = 'X Axis'
    const yLabel = 'Y Axis'
    const title = 'Test Chart'
    const color = 'blue'

    //ACT
    const imgUrl = await generateChartImg(type, data, xLabel, yLabel, title, color)

    //ASSERT
    expect(imgUrl).not.toBe(null)
})

test("The URL returned by generateChartImg for a bar chart is not null", async function () {

    //ARRANGE
    initDomFromFiles(
        `${__dirname}/../index.html`,
        `${__dirname}/../lib/generateChartImg.js`
    )
    const type = 'bar'
    const data = [{ x: 1, y: 2 }, { x: 2, y: 3 }]
    const xLabel = 'X Axis'
    const yLabel = 'Y Axis'
    const title = 'Test Chart'
    const color = 'blue'

    //ACT
    const imgUrl = await generateChartImg(type, data, xLabel, yLabel, title, color)

    //ASSERT
    expect(imgUrl).not.toBe(null)
})


test("The URL returned by generateChartImg for a scatter chart is not null", async function () {

    //ARRANGE
    initDomFromFiles(
        `${__dirname}/../index.html`,
        `${__dirname}/../lib/generateChartImg.js`
    )
    const type = 'scatter'
    const data = [{ x: 0, y: 0 }, { x: 1.9, y: 3.5 }]
    const xLabel = 'X Axis'
    const yLabel = 'Y Axis'
    const title = 'Test Chart'
    const color = 'blue'

    //ACT
    const imgUrl = await generateChartImg(type, data, xLabel, yLabel, title, color)

    //ASSERT
    expect(imgUrl).not.toBe(null)
})

test("The URL returned by generateChartImg without a color defined is not null", async function () {

    //ARRANGE
    initDomFromFiles(
        `${__dirname}/../index.html`,
        `${__dirname}/../lib/generateChartImg.js`
    )
    const type = 'line'
    const data = [{ x: 4, y: 4 }, { x: -4, y: -4 }]
    const xLabel = 'X Axis'
    const yLabel = 'Y Axis'
    const title = 'Test Chart'
    const color = undefined

    //ACT
    const imgUrl = await generateChartImg(type, data, xLabel, yLabel, title, color)

    //ASSERT
    expect(imgUrl).not.toBe(null)
})

test("The URL returned by generateChartImg without a title defined is not null", async function () {

    //ARRANGE
    initDomFromFiles(
        `${__dirname}/../index.html`,
        `${__dirname}/../lib/generateChartImg.js`
    )
    const type = 'line'
    const data = [{ x: 4, y: 4 }, { x: -4, y: -4 }]
    const xLabel = 'X Axis'
    const yLabel = 'Y Axis'
    const title = undefined
    const color = 'Blue'

    //ACT
    const imgUrl = await generateChartImg(type, data, xLabel, yLabel, title, color)

    //ASSERT
    expect(imgUrl).not.toBe(null)
})

test("The URL returned by generateChartImg without a title and color defined is not null", async function () {

    //ARRANGE
    initDomFromFiles(
        `${__dirname}/../index.html`,
        `${__dirname}/../lib/generateChartImg.js`
    )
    const type = 'line'
    const data = [{ x: 4, y: 4 }, { x: -4, y: -4 }]
    const xLabel = 'X Axis'
    const yLabel = 'Y Axis'
    const title = undefined
    const color = undefined

    //ACT
    const imgUrl = await generateChartImg(type, data, xLabel, yLabel, title, color)

    //ASSERT
    expect(imgUrl).not.toBe(null)
})

test("The URL returned by generateChartImg without an xLabel defined is not null", async function () {

    //ARRANGE
    initDomFromFiles(
        `${__dirname}/../index.html`,
        `${__dirname}/../lib/generateChartImg.js`
    )
    const type = 'line'
    const data = [{ x: 4, y: 4 }, { x: -4, y: -4 }]
    const xLabel = undefined
    const yLabel = 'Y Axis'
    const title = 'Test Chart'
    const color = 'blue'

    //ACT
    const imgUrl = await generateChartImg(type, data, xLabel, yLabel, title, color)

    //ASSERT
    expect(imgUrl).not.toBe(null)
})

test("The URL returned by generateChartImg without an xLabel, title, color defined is not null", async function () {

    //ARRANGE
    initDomFromFiles(
        `${__dirname}/../index.html`,
        `${__dirname}/../lib/generateChartImg.js`
    )
    const type = 'line'
    const data = [{ x: 4, y: 4 }, { x: -4, y: -4 }]
    const xLabel = 'X Axis'
    const yLabel = undefined
    const title = 'Test Chart'
    const color = 'blue'

    //ACT
    const imgUrl = await generateChartImg(type, data, xLabel, yLabel, title, color)

    //ASSERT
    expect(imgUrl).not.toBe(null)
})

test("The URL returned by generateChartImg without a yLabel defined is not null", async function () {

    //ARRANGE
    initDomFromFiles(
        `${__dirname}/../index.html`,
        `${__dirname}/../lib/generateChartImg.js`
    )     
    const type = 'line'
    const data = [{ x: 4, y: 4 }, { x: -4, y: -4 }]
    const yLabel = undefined
    const xLabel = 'xLabel'
    const title = 'Test Chart'
    const color = 'red'

    //ACT
    const imgUrl = await generateChartImg(type, data, xLabel, yLabel, title, color)

    //ASSERT
    expect(imgUrl).not.toBe(null)
})

test("The URL returned by generateChartImg without a xLabel, yLabel, title, and color defined is not null", async function () {

    //ARRANGE
    initDomFromFiles(
        `${__dirname}/../index.html`,
        `${__dirname}/../lib/generateChartImg.js`
    )
    const type = 'line'
    const data = [{ x: 4, y: 4 }, { x: -4, y: -4 }]
    const yLabel = undefined
    const xLabel = undefined
    const title = undefined
    const color = undefined

    //ACT
    const imgUrl = await generateChartImg(type, data, xLabel, yLabel, title, color)

    //ASSERT
    expect(imgUrl).not.toBe(null)
})

test("The URL returned by generateChartImg without data defined is not null", async function () {

    //ARRANGE
    initDomFromFiles(
        `${__dirname}/../index.html`,
        `${__dirname}/../lib/generateChartImg.js`
    )
    const type = 'line'
    const data = undefined
    const xLabel = 'X Axis'
    const yLabel = 'Y Axis'
    const title = 'Test Chart'
    const color = 'blue'

    //ACT
    const imgUrl = await generateChartImg(type, data, xLabel, yLabel, title, color)

    //ASSERT
    expect(imgUrl).not.toBe(null)
})

test("The URL returned by generateChartImg without data, xLabel, yLabel, title, and color defined is not null", async function () {

    //ARRANGE
    initDomFromFiles(
        `${__dirname}/../index.html`,
        `${__dirname}/../lib/generateChartImg.js`
    ) 
    const type = 'bar'
    const data = undefined
    const xLabel = undefined
    const yLabel = undefined
    const title = undefined
    const color = undefined

    //ACT
    const imgUrl = await generateChartImg(type, data, xLabel, yLabel, title, color)

    //ASSERT
    expect(imgUrl).not.toBe(null)
})

test("The URL returned by generateChartImg when data the is empty is not null", async function () {

    //ARRANGE
    initDomFromFiles(
        `${__dirname}/../index.html`,
        `${__dirname}/../lib/generateChartImg.js`
    )
    const type = 'scatter'
    const data = []
    const xLabel = undefined
    const yLabel = undefined
    const title = undefined
    const color = undefined

    //ACT
    const imgUrl = await generateChartImg(type, data, xLabel, yLabel, title, color)

    //ASSERT
    expect(imgUrl).not.toBe(null)
})

test("The URL returned by generateChartImg when the data object contains 1 elemeent is not null", async function () {

    //ARRANGE
    initDomFromFiles(
        `${__dirname}/../index.html`,
        `${__dirname}/../lib/generateChartImg.js`
    ) 
    const type = 'line'
    const data = [{ x: 150, y: -140.0 }]
    const xLabel = undefined
    const yLabel = undefined
    const title = undefined
    const color = undefined

    //ACT
    const imgUrl = await generateChartImg(type, data, xLabel, yLabel, title, color)

    //ASSERT
    expect(imgUrl).not.toBe(null)
})

test("The URL returned by generateChartImg when everything but the title is passed as an empty string", async function () {

    //ARRANGE
    initDomFromFiles(
        `${__dirname}/../index.html`,
        `${__dirname}/../lib/generateChartImg.js`
    ) 
    const type = 'scatter'
    const data = ""
    const xLabel = ""
    const yLabel = ""
    const title = ""
    const color = ""

    //ACT
    const imgUrl = await generateChartImg(type, data, xLabel, yLabel, title, color)

    //ASSERT
    expect(imgUrl).not.toBe(null)
})

