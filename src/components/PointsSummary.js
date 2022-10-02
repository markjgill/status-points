import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DateTime, Interval } from 'luxon';
import { always, cond, gte, T, __ } from 'ramda';
import { Card } from 'primereact/card';
import { Knob } from 'primereact/knob';

import { setCurrentPoints, setCurrentTier } from '../reducers/statusPoints';

const PointsSummary = () => {
    const dispatch = useDispatch();
    const statusPoints = useSelector(state => state.statusPoints.statusPoints);
    const { silver, gold, elite } = useSelector(state => state.settings.points);

    const endOfToday = DateTime.now().endOf("day");
    const lastTwelveMonths = Interval.fromDateTimes(endOfToday.minus({ months: 12 }), endOfToday);

    const filteredStatusPoints = statusPoints.filter(({ date }) => lastTwelveMonths.contains(date));

    const totalPoints = filteredStatusPoints.map(({ points }) => points)
        .reduce((acc, val) => acc + val, 0);

    const { currentTier, max } = cond([
        [gte(__, elite), always({ currentTier: "eiite", max: Infinity })],
        [gte(__, gold), always({ currentTier: "gold", max: elite })],
        [gte(__, silver), always({ currentTier: "silver", max: gold })],
        [T, always({ currentTier: "none", max: silver })]
    ])(totalPoints);

    useEffect(() => {
        dispatch(setCurrentPoints(totalPoints));
        dispatch(setCurrentTier(currentTier));
    }, [dispatch, totalPoints, currentTier]);

    return (
        <Card className="border-1">
            <div className="flex flex-column">
                <h2 className="flex justify-content-center">Points Summary</h2>
                <div className="flex justify-content-center">
                    <Knob min={0} max={max} value={Math.trunc(totalPoints)} valueColor={"rgb(0, 255, 0)"} readOnly />
                </div>
            </div>
        </Card>
    );
};

export default PointsSummary;