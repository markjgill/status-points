import { useSelector } from 'react-redux';
import { DateTime, Interval } from 'luxon';
import { Card } from 'primereact/card';
import { Knob } from 'primereact/knob';

const TypeSummary = () => {
    const statusPoints = useSelector(state => state.statusPoints.statusPoints);

    const endOfToday = DateTime.now().endOf("day");
    const lastTwelveMonths = Interval.fromDateTimes(endOfToday.minus({ months: 12 }), endOfToday);

    const filteredStatusPoints = statusPoints.filter(({ date }) => lastTwelveMonths.contains(date));

    const totalPoints = filteredStatusPoints.map(({ points }) => points)
        .reduce((acc, val) => acc + val, 0);

    const flightsPoints = filteredStatusPoints.filter(({ type }) => type === "Flight")
        .map(({ points }) => points)
        .reduce((acc, val) => acc + val, 0);

    const value = totalPoints === 0 ? 0 : (flightsPoints / totalPoints) * 100;

    return (
        <Card>
            <div className="flex flex-column">
                <h2 className="flex justify-content-center">Flights vs Card</h2>
                <div className="flex justify-content-center">
                    <Knob value={value.toFixed(2)} valueColor={"rgb(0, 255, 0)"} rangeColor={"rgb(255, 0, 0)"} valueTemplate={"{value}%"} readOnly />
                </div>
            </div>
        </Card>
    );
};

export default TypeSummary;