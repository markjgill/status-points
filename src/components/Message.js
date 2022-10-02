import { useSelector } from 'react-redux';
import { always, cond, equals, T } from 'ramda';
import { Card } from 'primereact/card';

const Message = () => {
    const currentPoints = useSelector(state => state.statusPoints.currentPoints);
    const currentTier = useSelector(state => state.statusPoints.currentTier);
    const pointsAfterTierReached = useSelector(state => state.statusPoints.pointsAfterTierReached);
    const retention = useSelector(state => state.settings.retention);
    const points = useSelector(state => state.settings.points);

    const nextTier = cond([
        [equals("silver"), always("gold")],
        [equals("gold"), always("elite")],
        [equals("elite"), always("elite")],
        [T, always("silver")]
    ])(currentTier);

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