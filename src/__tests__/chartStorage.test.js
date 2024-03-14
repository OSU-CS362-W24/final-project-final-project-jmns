/**
 * @jest-environment jsdom
 */

const { saveChart, loadAllSavedCharts, loadSavedChart, updateCurrentChartData, loadCurrentChartData } = require('../lib/chartStorage')

describe("Testing for saveChart function begins here", () => {

    beforeEach(() => {
        window.localStorage.clear()
    })

    test("saveChart function can save a new chart to localStorage", function () {

        //ARRANGE
        const newChart = { title: 'New Chart', data: [{ 'x': 1, 'y': 1 }, { 'x': 2, 'y': 2 }, { 'x': 3, 'y': 3 }, { 'x': 4, 'y': 4 }, { 'x': 5, 'y': 5 }] }

        //ACT
        saveChart(newChart)
        const savedCharts = JSON.parse(window.localStorage.getItem('savedCharts'))

        //ASSERT
        expect(savedCharts).not.toBeNull()
        expect(savedCharts[0]).toEqual(newChart)
        expect(savedCharts.length).toBe(1)
    })

    test("saveChart function can update an existing chart (when the index is less than the number of charts) in localStorage", function () {

        //ARRANGE
        const initialChart = { title: 'Initial Chart', data: [{ x: 0, y: 0 }] }
        const updatedChart = { title: 'Updated Chart', data: [{ x: 5, y: 5 }] }

        //ACT
        //replace the initial chart with the updated chart 
        saveChart(initialChart, 0)
        saveChart(updatedChart, 0)
        const savedCharts = JSON.parse(window.localStorage.getItem('savedCharts'))

        //ASSERT
        expect(savedCharts).not.toBeNull()
        expect(savedCharts.length).toBe(1)
        expect(savedCharts[0]).toEqual(updatedChart)
    })

    test("saveChart function can save multiple charts at different valid indicies to localStorage", function () {

        //ARRANGE
        const initialChart = { title: 'Initial Chart', data: [{ x: -100, y: -100 }, { x: 0, y: 0 }, { x: 10, y: 10 }] }
        const updatedChart = { title: 'Secondary Chart', data: [{ x: 100, y: 100 }, { x: 200, y: 200 }, { x: 300, y: 300 }] }

        //ACT
        saveChart(initialChart)
        saveChart(updatedChart)
        const savedCharts = JSON.parse(window.localStorage.getItem('savedCharts'))

        //ASSERT
        expect(savedCharts).not.toBeNull()
        expect(savedCharts.length).toBe(2)
        expect(savedCharts[0]).toEqual(initialChart)
        expect(savedCharts[1]).toEqual(updatedChart)
    })

    test("saveChart function appends a new chart when the index is null", function () {

        //ARRANGE
        const initialChart = { title: 'Initial Chart', data: [{ x: 1.1, y: 2.2 }, { x: 3.3, y: 4.4 }] }
        const secondaryChart = { title: 'Secondary Chart', data: [{ x: -1.1, y: -2.2 }, { x: -3.3, y: -4.4 }] }

        //ACT
        saveChart(initialChart, null)
        saveChart(secondaryChart, null)
        const savedCharts = JSON.parse(window.localStorage.getItem('savedCharts'))

        //ASSERT
        expect(savedCharts).not.toBeNull()
        expect(savedCharts.length).toBe(2)
        expect(savedCharts[0]).toEqual(initialChart)
        expect(savedCharts[1]).toEqual(secondaryChart)
    })

    test("saveChart function can save multiple charts at the end of the array (when the index is greater than the number of charts) to localStorage", function () {

        //ARRANGE
        const initialChart = { title: 'Intiail Chart', data: [{ x: 1, y: 2 }, { x: 2, y: 1 }] }
        const secondaryChart = { title: 'Secondary Chart', data: [{ x: 4, y: 6 }, { x: 5, y: 2 }] }

        //ACT
        saveChart(initialChart, 5)
        saveChart(secondaryChart, 10)
        const savedCharts = JSON.parse(window.localStorage.getItem('savedCharts'))

        //ASSERT
        expect(savedCharts).not.toBeNull()
        expect(savedCharts.length).toBe(2)
        expect(savedCharts[0]).toEqual(initialChart)
        expect(savedCharts[1]).toEqual(secondaryChart)
    })

    test("saveChart function overwrites charts to localStorage when the index is negative", function () {

        //ARRANGE
        const initialChart = { title: 'Intiail Chart', data: [{ x: 44, y: 44 }, { x: 22, y: 44 }] }
        const updatedChart = { title: 'Secondary Chart', data: [{ x: 77, y: 66 }, { x: 55, y: 44 }] }

        //ACT
        saveChart(initialChart, -3)
        saveChart(updatedChart, -4)
        const savedCharts = JSON.parse(window.localStorage.getItem('savedCharts'))

        //ASSERT
        expect(savedCharts).not.toBeNull()
        expect(savedCharts.length).toBe(1)
        expect(savedCharts[0]).toEqual(updatedChart)
    })
})

describe("Testing for loadAllSavedCharts function begins here", () => {

    beforeEach(() => {
        window.localStorage.clear()
    })

    test("loadAllSavedCharts function returns an empty array when localStorage is empty", () => {

        //ACT
        const charts = loadAllSavedCharts()

        //ASSERT
        expect(charts).toEqual([])
        expect(charts.length).toBe(0)

    })

    test("loadAllSavedCharts function can return a single chart from local storage", () => {

        //ARRANGE
        const firstChart = { title: 'First Chart', data: [{ 'x': 1, 'y': 1 }, { 'x': 2, 'y': 2 }, { 'x': 3, 'y': 3 }] }

        //ACT
        saveChart(firstChart)
        const loadedCharts = loadAllSavedCharts()

        //ASSERT
        expect(loadedCharts).not.toBeNull()
        expect(loadedCharts.length).toBe(1)
        expect(loadedCharts[0]).toEqual(firstChart)

    })

    test("loadAllSavedCharts function can return multiple charts from local storage", () => {

        //ARRANGE
        const initialChart = { title: 'Intitial Chart', data: [{ 'x': 1, 'y': 1 }, { 'x': 2, 'y': 2 }, { 'x': 3, 'y': 3 }] }
        const secondaryChart = { title: 'Secondary Chart', data: [{ 'x': 4, 'y': 4 }, { 'x': 5, 'y': 5 }, { 'x': 6, 'y': 6 }] }

        //ACT
        saveChart(initialChart)
        saveChart(secondaryChart)
        const loadedCharts = loadAllSavedCharts()

        //ASSERT
        expect(loadedCharts).not.toBeNull()
        expect(loadedCharts.length).toBe(2)
        expect(loadedCharts[0]).toEqual(initialChart)
        expect(loadedCharts[1]).toEqual(secondaryChart)

    })
})

describe("Tests for loadSavedChart function start here", () => {

    beforeEach(() => {
        window.localStorage.clear()
    })

    test("loadSavedChart returns a chart at a valid index when there is a single chart stored", () => {

        //ARRANGE
        const firstChart = { title: 'First Chart', data: [{ 'x': 1, 'y': 1 }, { 'x': 2, 'y': 2 }, { 'x': 3, 'y': 3 }] }

        //ACT
        saveChart(firstChart)
        const loadedChart = loadSavedChart(0)

        //ASSERT
        expect(loadedChart).not.toBeNull()
        expect(loadedChart).toEqual(firstChart)
    })

    test("loadSavedChart returns a chart at a valid index when there are multiple charts stored", () => {

        //ARRANGE
        const firstChart = { title: 'First Chart', data: [{ 'x': 1, 'y': 1 }, { 'x': 2, 'y': 2 }, { 'x': 3, 'y': 3 }] }
        const secondChart = { title: 'Second Chart', data: [{ 'x': 4, 'y': 4 }, { 'x': 5, 'y': 5 }, { 'x': 6, 'y': 6 }] }
        const thirdChart = { title: 'Third Chart', data: [{ 'x': 7, 'y': 7 }, { 'x': 8, 'y': 8 }, { 'x': 9, 'y': 9 }] }

        //ACT
        saveChart(firstChart)
        saveChart(secondChart)
        saveChart(thirdChart)
        const loadedChart = loadSavedChart(1)

        //ASSERT
        expect(loadedChart).not.toBeNull()
        expect(loadedChart).not.toEqual(firstChart)
        expect(loadedChart).toEqual(secondChart)
    })

    test("loadSavedChart returns an empty object when there are no charts saved in local storage", () => {

        //ACT
        const loadedChart = loadSavedChart(0)

        //ASSERT
        expect(loadedChart).not.toBeNull()
        expect(loadedChart).toEqual({})
    })

    test("loadSavedChart returns an empty object when an invalid index is stored in local storage", () => {

        //ARRANGE
        const firstChart = { title: 'First Chart', data: [{ 'x': 8, 'y': 8 }, { 'x': 8, 'y': 8 }, { 'x': 8, 'y': 8 }] }
        const secondChart = { title: 'Second Chart', data: [{ 'x': 0, 'y': 0 }, { 'x': 0, 'y': 0 }, { 'x': 0, 'y': 0 }] }

        //ACT
        saveChart(firstChart, -99)
        saveChart(secondChart, -99)
        const loadedChart = loadSavedChart(-99)

        //ASSERT
        expect(loadedChart).not.toEqual(firstChart)
        expect(loadedChart).not.toEqual(secondChart)
        expect(loadedChart).not.toBeNull()
        expect(loadedChart).toEqual({})
    })
})

//Tests for loadSavedCharts function start here - - - 



//Tests for updateCurrentChartData function start here - - - 



//Tests for loadCurrentChartData function start here - - - 

