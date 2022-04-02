import { DateTime, Interval } from 'luxon';
import { useSelector } from 'react-redux';
import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';

const PointsChart = () => {
    const statusPoints = useSelector(state => state.statusPoints.statusPoints);

    const startOfToday = DateTime.now().startOf("day");
    const lastTwelveMonths = Interval.fromDateTimes(startOfToday.minus({ months: 12 }), startOfToday);

    const colorOptions = {
        Flight: {
            outsideRange: "rgb(0, 255, 0, 0.2)",
            insideRange: "rgb(0, 255, 0, 1.0)"
        },
        Card: {
            outsideRange: "rgb(255, 0, 0, 0.2)",
            insideRange: "rgb(255, 0, 0, 1.0)"
        }
    };

    const data = {
        labels: statusPoints.map(({ date }) => date.toLocaleString(DateTime.DATE_MED)),
        datasets: [
            {
                backgroundColor: statusPoints.map(({ date, type }) => colorOptions[type][lastTwelveMonths.contains(date) ? "insideRange" : "outsideRange"]),
                data: statusPoints.map(({ points }) => points)
            }
        ]
    };

    const options = {
        maintainAspectRatio: false,
        aspectRatio: 0.75,
        plugins: {
            legend: {
                display: false
            }
        }
    };

    return (
        <Card>
            <div className="flex flex-column">
                <h2 className="flex justify-content-center">Points Chart</h2>
                <Chart type="bar" data={data} options={options} />
            </div>
        </Card>
    );
};

export default PointsChart;