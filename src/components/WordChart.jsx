import ReactECharts from "echarts-for-react";
import { useState, useEffect } from "react";

export default function WordChart() {
  var option;

  option = {
    legend: {},
    tooltip: {
      trigger: "axis",
      showContent: false,
    },
    dataset: {
      source: [
        ["product", "2012", "2013", "2014", "2015", "2016", "2017"],
        ["Total words", 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
        ["Mastered words", 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
      ],
    },
    xAxis: { type: "category" },
    yAxis: { gridIndex: 0 },
    grid: { top: "55%" },
    series: [
      {
        type: "line",
        smooth: true,
        seriesLayoutBy: "row",
        emphasis: { focus: "series" },
      },
      {
        type: "line",
        smooth: true,
        seriesLayoutBy: "row",
        emphasis: { focus: "series" },
      },
      {
        type: "pie",
        id: "pie",
        radius: "30%",
        center: ["50%", "25%"],
        emphasis: {
          focus: "self",
        },
        label: {
          formatter: "{b}: {@2012} ({d}%)",
        },
        encode: {
          itemName: "product",
          value: "2012",
          tooltip: "2012",
        },
      },
    ],
  };

  return (
    <>
      <ReactECharts option={option} />
    </>
  );
}
