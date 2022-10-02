import { useSelector } from 'react-redux';
import { always, cond, equals, T } from 'ramda';
import { DateTime, Interval } from 'luxon';
import { Card } from 'primereact/card';

const Message = () => {
    const statusPoints = useSelector(state => state.statusPoints.statusPoints);
    const currentPoints = useSelector(state => state.statusPoints.currentPoints);
    const currentTier = useSelector(state => state.statusPoints.currentTier);
    const tierReachedDate = useSelector(state => state.statusPoints.tierReachedDate);
    const retention = useSelector(state => state.settings.retention);
    const points = useSelector(state => state.settings.points);

    console.info(tierReachedDate);

    const nextTier = cond([
        [equals("silver"), always("gold")],
        [equals("gold"), always("elite")],
        [equals("elite"), always("elite")],
        [T, always("silver")]
    ])(currentTier);

    const endOfToday = DateTime.now().endOf("day");
    const tierReachedDateToToday = Interval.fromDateTimes(tierReachedDate.plus({ days: 1 }), endOfToday);
    const pointsAfterTierReached = statusPoints.filter(({ date }) => tierReachedDateToToday.contains(date))
        .map(({ points }) => points)
        .reduce((acc, val) => acc + val, 0);

    const tierMessage = `You are ${points[nextTier] - Math.trunc(currentPoints)} points away from ${nextTier} status`;
    const retentionMessage = `and ${points[currentTier] * (retention / 100) - Math.trunc(pointsAfterTierReached)} points away from retaining ${currentTier} status`;

    return (
        <Card className="border-1 bg-green-200">
            <h4 className="m-0 text-center">{tierMessage}</h4>
            { currentTier !== "none" ? <h4 className="m-0 text-center">{retentionMessage}</h4> : null}
        </Card>
   );
};

export default Message;