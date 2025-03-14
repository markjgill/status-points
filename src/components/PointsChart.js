import { useSelector } from 'react-redux';
import { DateTime, Interval } from 'luxon';
import { add, compose, filter, groupBy, keys, map, mapObjIndexed, prop, reduce, values } from 'ramda';
import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';

const PointsChart = () => {
    const statusPoints = useSelector(state => state.statusPoints.statusPoints);

    const endOfToday = DateTime.now().endOf("day");
    const nextYear = endOfToday.plus({ years: 1 });
    const lastTwelveMonths = Interval.fromDateTimes(endOfToday.minus({ months: 12 }), endOfToday);
    const lastFifteenMonths = Interval.fromDateTimes(endOfToday.minus({ months: 15 }), nextYear);

    const statusPointsByDate = compose(
        mapObjIndexed(value => ({
            opacity: lastTwelveMonths.contains(DateTime.fromISO(value[0].date)) ? 1.0 : 0.25,
            ...groupBy(prop("type"), value)
        })),
        filter(value => lastFifteenMonths.contains(DateTime.fromISO(value[0].date))),
        groupBy(({ date }) => DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED)),
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
        <Card className="border-1">
            <div className="flex flex-column">
                <h2 className="flex justify-content-center m-1">Points Chart</h2>
                <Chart type="bar" data={data} options={options} />
            </div>
        </Card>
    );
};

export default PointsChart;