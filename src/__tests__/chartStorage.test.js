/**
 * @jest-environment jsdom
 */

const { saveChart, loadAllSavedCharts, loadSavedChart, updateCurrentChartData, loadCurrentChartData } = require('../lib/chartStorage')

describe("Testing for saveChart function begins here", () => {

    beforeEach(() => {
        window.localStorage.clear()
    })

    test("saveChart function can save a new chart to localStorage", function(){

        //Arrange
        const newChart = { title: 'New Chart', data: [{'x': 1, 'y': 1}, {'x': 2, 'y': 2}, {'x': 3, 'y': 3}, {'x': 4, 'y': 4}, {'x': 5, 'y': 5}]};
    
        //ACT
        saveChart(newChart)
        const savedCharts = JSON.parse(window.localStorage.getItem('savedCharts'));
    
        //ASSERT
        expect(savedCharts).not.toBeNull();
        expect(savedCharts[0]).toEqual(newChart)
        expect(savedCharts.length).toBe(1);
    });

    test("saveChart function can update an existing chart in localStorage", function(){

        //Arrange
        const initialChart = { title: 'Intial Chart', data: [{ x: 0, y: 0 }] };
        const updatedChart = { title: 'Updated Chart', data: [{ x: 5, y: 5 }] };
    
        //ACT
        window.localStorage.setItem('savedCharts', JSON.stringify([initialChart]));
        //replace the initial chart with the updated chart 
        saveChart(updatedChart, 0);
        const savedCharts = JSON.parse(window.localStorage.getItem('savedCharts'));
    
        //ASSERT
        expect(savedCharts).not.toBeNull();
        expect(savedCharts.length).toBe(1);
        expect(savedCharts[0]).toEqual(updatedChart)
    });

    test("saveChart function can save multiple charts at different valid indicies to localStorage", function(){

        //Arrange
        const initialChart = { title: 'Intial Chart', data: [{ x: -100, y: -100 }, { x: 0, y: 0 }, { x: 10, y: 10 }]};
        const updatedChart = { title: 'Secondary Chart', data: [{ x: 100, y: 100 }, { x: 200, y: 200 }, { x: 300, y: 300 }] };
    
        //ACT
        saveChart(initialChart)
        saveChart(updatedChart);
        const savedCharts = JSON.parse(window.localStorage.getItem('savedCharts'));
    
        //ASSERT
        expect(savedCharts).not.toBeNull();
        expect(savedCharts.length).toBe(2);
        expect(savedCharts[0]).toEqual(initialChart)
        expect(savedCharts[1]).toEqual(updatedChart)
    });

    test("saveChart function appends a new chart when the index is null", function(){

        //Arrange
        const initialChart = { title: 'Intiail Chart', data: [{ x: 1.1, y: 2.2 }, { x: 3.3, y: 4.4 }]};
        const SecondaryChart = { title: 'Secondary Chart', data: [{ x: -1.1, y: -2.2 }, { x: -3.3, y: -4.4 }]};
    
        //ACT
        saveChart(initialChart, null)
        saveChart(SecondaryChart, null)
        const savedCharts = JSON.parse(window.localStorage.getItem('savedCharts'));
    
        //ASSERT
        expect(savedCharts).not.toBeNull()
        expect(savedCharts.length).toBe(2)
        expect(savedCharts[0]).toEqual(initialChart)
        expect(savedCharts[1]).toEqual(SecondaryChart)
    });
})

//Tests for loadAllSavedCharts function start here - - - 
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
        const firstChart = { title: 'First Chart', data: [{'x': 1, 'y': 1}, {'x': 2, 'y': 2}, {'x': 3, 'y': 3}] };
        
        //ACT
        saveChart(firstChart)
        const loadedCharts = loadAllSavedCharts();

        //ASSERT
        expect(loadedCharts).not.toBeNull()
        expect(loadedCharts.length).toBe(1)
        expect(loadedCharts[0]).toEqual(firstChart);

    })

    test("loadAllSavedCharts function can return multiple charts from local storage", () => {

        //ARRANGE
        const initialChart = { title: 'Intitial Chart', data: [{'x': 1, 'y': 1}, {'x': 2, 'y': 2}, {'x': 3, 'y': 3}] };
        const secondaryChart = { title: 'Secondary Chart', data: [{'x': 4, 'y': 4}, {'x': 5, 'y': 5}, {'x': 6, 'y': 6}] };
        
        //ACT
        saveChart(initialChart)
        saveChart(secondaryChart)
        const loadedCharts = loadAllSavedCharts();

        //ASSERT
        expect(loadedCharts).not.toBeNull()
        expect(loadedCharts.length).toBe(2)
        expect(loadedCharts[0]).toEqual(initialChart);
        expect(loadedCharts[1]).toEqual(secondaryChart);

    })

})


//Tests for loadSavedCharts function start here - - - 



//Tests for updateCurrentChartData function start here - - - 



//Tests for loadCurrentChartData function start here - - - 

