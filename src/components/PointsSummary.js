import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DateTime, Interval } from 'luxon';
import { Card } from 'primereact/card';
import { Knob } from 'primereact/knob';

import { setCurrentPoints } from '../reducers/statusPoints';

const PointsSummary = () => {
    const dispatch = useDispatch();
    const statusPoints = useSelector(state => state.statusPoints.statusPoints);

    const endOfToday = DateTime.now().endOf("day");
    const lastTwelveMonths = Interval.fromDateTimes(endOfToday.minus({ months: 12 }), endOfToday);

    const filteredStatusPoints = statusPoints.filter(({ date }) => lastTwelveMonths.contains(date));

    const totalPoints = filteredStatusPoints.map(({ points }) => points)
        .reduce((acc, val) => acc + val, 0);

    useEffect(() => dispatch(setCurrentPoints(totalPoints)));

    return (
        <Card className="border-1">
            <div className="flex flex-column">
                <h2 className="flex justify-content-center">Points Summary</h2>
                <div className="flex justify-content-center">
                    <Knob min={0} max={450} value={totalPoints.toFixed(0)} valueColor={"rgb(0, 255, 0)"} readOnly />
                </div>
            </div>
        </Card>
    );
};

export default PointsSummary;