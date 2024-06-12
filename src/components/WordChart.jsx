import ReactECharts from "echarts-for-react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function WordChart() {
  const url = import.meta.env.VITE_BACKEND_URL;

  const [wordData, setWordData] = useState([]);
  const [masteredData, setMasteredData] = useState([]);
  const [month, setMonth] = useState([]);
  const [pointerIdx, setPointerIdx] = useState(0);

  const [selectedMonth, setSelectedMonth] = useState("6");

  const handleChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  useEffect(() => {
    async function getData() {
      try {
        const getData = await axios.get(`${url}/word/data/${selectedMonth}`);
        const data = getData.data;
        setMonth(data.monthsArr);
        setWordData(data.arrOfWords);
        setMasteredData(data.arrOfMastered);
      } catch (err) {
        console.log("msg: ", err);
      }
    }

    getData();
  }, [selectedMonth]);

  var option = {
    legend: {},
    tooltip: {
      trigger: "axis",
      showContent: false,
    },
    dataset: {
      source: [
        ["year", ...month],
        ["Total", ...wordData],
        ["Mastered", ...masteredData],
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
        radius: "35%",
        center: ["50%", "25%"],
        emphasis: {
          focus: "self",
        },
        label: {
          formatter: `{b}:{@${month[pointerIdx]}}({d}%)`,
        },
        encode: {
          itemName: "year",
          value: month[pointerIdx],
          tooltip: month[pointerIdx],
        },
      },
    ],
  };

  const onChartPointer = (params) => {
    if (params.dataIndex) {
      setPointerIdx(params.dataIndex);
    } else {
      setPointerIdx(0);
    }
  };

  const onEvents = {
    updateAxisPointer: onChartPointer,
  };

  return (
    <Box sx={{}}>
      <Box sx={{ minWidth: 120, my: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Months</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedMonth}
            label="Age"
            onChange={handleChange}
            sx={{ height: "40px" }}
          >
            <MenuItem value={6}>6 months</MenuItem>
            <MenuItem value={12}>1 year</MenuItem>
            <MenuItem value={24}>2 years</MenuItem>
            <MenuItem value={60}>5 years</MenuItem>
            <MenuItem value={120}>10 years</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <ReactECharts
        option={option}
        style={{ height: "350px", width: "100%" }}
        onEvents={onEvents}
      />
    </Box>
  );
}
