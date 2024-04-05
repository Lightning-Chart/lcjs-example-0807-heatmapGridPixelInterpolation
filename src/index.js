/*
 * LightningChartJS example that showcases the pixel interpolation mode feature of 2D Heatmaps.
 */
// Import LightningChartJS
const lcjs = require('@arction/lcjs')

// Extract required parts from LightningChartJS.
const { lightningChart, PalettedFill, LUT, LegendBoxBuilders, emptyFill, UIOrigins, regularColorSteps, Themes } = lcjs

const { createWaterDropDataGenerator } = require('@arction/xydata')

// Define heatmap intensity data.
const heatmapColumns = 20
const heatmapRows = 40

// Create Dashboard with two charts and two Heatmap Grid Series.
// NOTE: Using `Dashboard` is no longer recommended for new applications. Find latest recommendations here: https://lightningchart.com/js-charts/docs/basic-topics/grouping-charts/
const dashboard = lightningChart({
            resourcesBaseUrl: new URL(document.head.baseURI).origin + new URL(document.head.baseURI).pathname + 'resources/',
        }).Dashboard({
    numberOfColumns: 2,
    numberOfRows: 1,
})

// Define color look up table.
const theme = dashboard.getTheme()
const palette = new PalettedFill({
    lookUpProperty: 'value',
    lut: new LUT({
        interpolate: true,
        steps: regularColorSteps(0, 100, theme.examples.intensityColorPalette),
    }),
})

const chart0 = dashboard
    .createChartXY({
        columnIndex: 0,
        rowIndex: 0,
    })
    .setTitleFillStyle(emptyFill)
    .setPadding({ top: 80 })

const heatmap0 = chart0
    .addHeatmapGridSeries({
        columns: heatmapColumns,
        rows: heatmapRows,
        dataOrder: 'rows',
    })
    .setFillStyle(palette)
    .setIntensityInterpolation('bilinear')
    .setCursorInterpolationEnabled(true)

const legend0 = chart0
    .addLegendBox(LegendBoxBuilders.HorizontalLegendBox)
    // Dispose example UI elements automatically if they take too much space. This is to avoid bad UI on mobile / etc. devices.
    .setAutoDispose({
        type: 'max-width',
        maxWidth: 0.5,
    })
    .add(chart0)
    .setPosition({ x: 100, y: 100 })
    .setOrigin(UIOrigins.RightTop)

const chart1 = dashboard
    .createChartXY({
        columnIndex: 1,
        rowIndex: 0,
    })
    .setTitleFillStyle(emptyFill)
    .setPadding({ top: 80 })

const heatmap1 = chart1
    .addHeatmapGridSeries({
        columns: heatmapColumns,
        rows: heatmapRows,
        dataOrder: 'rows',
    })
    .setFillStyle(palette)
    .setIntensityInterpolation('disabled')
    .setCursorInterpolationEnabled(false)

const legend1 = chart1
    .addLegendBox(LegendBoxBuilders.HorizontalLegendBox)
    // Dispose example UI elements automatically if they take too much space. This is to avoid bad UI on mobile / etc. devices.
    .setAutoDispose({
        type: 'max-width',
        maxWidth: 0.5,
    })
    .add(chart1)
    .setPosition({ x: 100, y: 100 })
    .setOrigin(UIOrigins.RightTop)

// Generate test data.
createWaterDropDataGenerator()
    .setColumns(heatmapColumns)
    .setRows(heatmapRows)
    .generate()
    .then((data) => {
        heatmap0.invalidateIntensityValues(data)
        heatmap1.invalidateIntensityValues(data)
    })
