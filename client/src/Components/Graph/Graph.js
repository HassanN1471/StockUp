import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

const Graph = (props) => {

    const data = props.data.data;

    let ohlc = [],
        volume = [],
        dataLength = data.length;

    for (let i = 0 ; i < dataLength; i += 1) {
        ohlc.push([
            data[i][0], //date
            data[i][1], //open
            data[i][2], //high
            data[i][3], //low
            data[i][4] //close
        ]);

        volume.push([
            data[i][0], //date
            data[i][5] //volume
        ]);
    }
    const timezone = new Date().getTimezoneOffset()

    Highcharts.setOptions({
        global: {
            timezoneOffset: timezone
        },
        plotOptions: {
            candlestick: {
                color: '#f72121',//red
                upColor: '#19be87'//green
            }
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                minute: '%I:%M %p',
                hour: '%I %p',
            }
        },
    });

    const options = {
        rangeSelector: {
            enabled: false
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
                    x: -3,
                },
                offset: 25,
                title: {
                    text: "OHLC"
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
                offset: 25,
                title: {
                    text: "Volume"
                },
                top: "65%",
                height: "35%",
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
            },
            {
                type: "column",
                name: "Volume",
                data: volume,
                yAxis: 1,
            }
        ]
    };

    return (
        <HighchartsReact
            highcharts={Highcharts}
            constructorType={"stockChart"}
            options={options}
        />
    );
}

export default Graph;