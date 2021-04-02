import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

const Graph = (props) => {

    const data = props.data.data;

    let ohlc = [],
        volume = [],
        dataLength = data.length,
        groupingUnits = [
            [
                "week", // unit name
                [1] // allowed multiples
            ],
            ["month", [1, 2, 3, 4, 6]]
        ],
        i = 0;

    for (i; i < dataLength; i += 1) {
        ohlc.push([
            data[i][0], // the date
            data[i][1], // open
            data[i][2], // high
            data[i][3], // low
            data[i][4] // close
        ]);

        volume.push([
            data[i][0], // the date
            data[i][5] // the volume
        ]);
    }
    const timezone = new Date().getTimezoneOffset()

    Highcharts.setOptions({
        global: {
            timezoneOffset: timezone
        }
    });

    const options = {
        rangeSelector: {
            enabled:false
        },

        navigator: {
            enabled: false
        },

        scrollbar: {
            enabled: false
        },

        title: {
            text: props.data.symbol
        },

        yAxis: [
            {
                labels: {
                    align: "right",
                    x: -3
                },
                title: {
                    text: "Close"
                },
                height: "60%",
                lineWidth: 2,
                resize: {
                    enabled: true
                }
            },
            {
                labels: {
                    align: "right",
                    x: -3
                },
                title: {
                    text: "Volume"
                },
                top: "65%",
                height: "35%",
                offset: 0,
                lineWidth: 2
            }
        ],

        credits: {
            enabled: false
        },

        tooltip: {
            split: true
        },

        series: [
            {
                type: "candlestick",
                name: props.data.symbol,
                data: ohlc,
                dataGrouping: {
                    units: groupingUnits
                }
            },
            {
                type: "column",
                name: "Volume",
                data: volume,
                yAxis: 1,
                dataGrouping: {
                    units: groupingUnits
                }
            }
        ]
    };

    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                constructorType={"stockChart"}
                options={options}
            />
        </div>
    );
}

export default Graph;