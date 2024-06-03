import ReactECharts from "echarts-for-react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function WordChart() {
  const url = import.meta.env.VITE_BACKEND_URL;

  const [wordData, setWordData] = useState([]);
  const [masteredData, setMasteredData] = useState([]);
  const [month, setMonth] = useState([]);

  useEffect(() => {
    async function getData() {
      const getData = await axios.get(`${url}/word/data`);
      const data = getData.data;
      console.log(data);
      setMonth(data.monthsArr);
      setWordData(data.arrOfWords);
      setMasteredData(data.arrOfMastered);
    }

    getData();
  }, []);

  var option = {
    legend: {},
    tooltip: {
      trigger: "axis",
      showContent: false,
    },
    dataset: {
      source: [
        ["year", ...month],
        ["Total words", ...wordData],
        ["Mastered words", ...masteredData],
      ],
    },
    xAxis: { type: "category" },
    yAxis: { gridIndex: 0 },
    grid: { top: "50%" },
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
          itemName: "year",
          value: month[0],
          tooltip: month[0],
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
