import { useSelector } from 'react-redux';
import { DateTime, Interval } from 'luxon';
import { add, compose, groupBy, keys, map, mapObjIndexed, prop, reduce, values } from 'ramda';
import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';

const PointsChart = () => {
    const statusPoints = useSelector(state => state.statusPoints.statusPoints);

    const startOfToday = DateTime.now().startOf("day");
    const lastTwelveMonths = Interval.fromDateTimes(startOfToday.minus({ months: 12 }), startOfToday);

    const statusPointsByDate = compose(
        mapObjIndexed(value => ({
            opacity: lastTwelveMonths.contains(value[0].date) ? 1.0 : 0.25,
            ...groupBy(prop("type"), value)
        })),
        groupBy(({ date }) => date.toLocaleString(DateTime.DATE_MED))
    )(statusPoints);

    const data = {
        labels: keys(statusPointsByDate),
        datasets: [
            {
                backgroundColor: values(mapObjIndexed(({ opacity }) => `rgb(0, 255, 0, ${opacity})`, statusPointsByDate)),
                data: mapObjIndexed(({ Flight = [] }) => reduce(add, 0, map(prop("points"), Flight)), statusPointsByDate)

            },
            {
                backgroundColor: values(mapObjIndexed(({ opacity }) => `rgb(255, 0, 0, ${opacity})`, statusPointsByDate)),
                data: mapObjIndexed(({ Card = [] }) => reduce(add, 0, map(prop("points"), Card)), statusPointsByDate)

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
        },
        scales: {
            x: {
                stacked: true
            },
            y: {
                stacked: true
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