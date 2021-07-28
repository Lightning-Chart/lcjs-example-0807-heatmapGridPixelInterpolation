/*
 * LightningChartJS example that showcases the pixel interpolation mode feature of 2D Heatmaps.
 */
// Import LightningChartJS
const lcjs = require("@arction/lcjs");

// Extract required parts from LightningChartJS.
const {
  lightningChart,
  PalettedFill,
  LUT,
  ColorRGBA,
  LegendBoxBuilders,
  emptyFill,
  UIOrigins,
  Themes,
} = lcjs;

const { createWaterDropDataGenerator } = require("@arction/xydata");

// Define heatmap intensity data.
const heatmapColumns = 20;
const heatmapRows = 40;

// Define color look up table.
const palette = new PalettedFill({
  lookUpProperty: "value",
  lut: new LUT({
    interpolate: true,
    steps: [
      { value: 0, color: ColorRGBA(255, 215, 0) },
      { value: 100, color: ColorRGBA(255, 0, 0) },
    ],
  }),
});

// Create Dashboard with two charts and two Heatmap Grid Series.
const dashboard = lightningChart().Dashboard({
  numberOfColumns: 2,
  numberOfRows: 1,
});

const chart0 = dashboard
  .createChartXY({
    columnIndex: 0,
    rowIndex: 0,
  })
  .setTitleFillStyle(emptyFill)
  .setPadding({ top: 80 });

const heatmap0 = chart0
  .addHeatmapGridSeries({
    columns: heatmapColumns,
    rows: heatmapRows,
    dataOrder: "rows",
  })
  .setFillStyle(palette)
  .setMouseInteractions(false)
  .setPixelInterpolationMode("bilinear")
  .setCursorInterpolationEnabled(true);

const legend0 = chart0
  .addLegendBox(LegendBoxBuilders.HorizontalLegendBox)
  // Dispose example UI elements automatically if they take too much space. This is to avoid bad UI on mobile / etc. devices.
  .setAutoDispose({
      type: 'max-width',
      maxWidth: 0.50,
  })
  .add(chart0)
  .setPosition({ x: 100, y: 100 })
  .setOrigin(UIOrigins.RightTop);

const chart1 = dashboard
  .createChartXY({
    columnIndex: 1,
    rowIndex: 0,
  })
  .setTitleFillStyle(emptyFill)
  .setPadding({ top: 80 });

const heatmap1 = chart1
  .addHeatmapGridSeries({
    columns: heatmapColumns,
    rows: heatmapRows,
    dataOrder: "rows",
  })
  .setFillStyle(palette)
  .setMouseInteractions(false)
  .setPixelInterpolationMode("disabled")
  .setCursorInterpolationEnabled(false);

const legend1 = chart1
  .addLegendBox(LegendBoxBuilders.HorizontalLegendBox)
  // Dispose example UI elements automatically if they take too much space. This is to avoid bad UI on mobile / etc. devices.
  .setAutoDispose({
      type: 'max-width',
      maxWidth: 0.50,
  })
  .add(chart1)
  .setPosition({ x: 100, y: 100 })
  .setOrigin(UIOrigins.RightTop);

// Generate test data.
createWaterDropDataGenerator()
  .setColumns(heatmapColumns)
  .setRows(heatmapRows)
  .generate()
  .then((data) => {
    heatmap0.invalidateIntensityValues(data);
    heatmap1.invalidateIntensityValues(data);
  });
