import { useSelector } from 'react-redux';
import { always, cond, gte, T, __ } from 'ramda';
import { Card } from 'primereact/card';
import { Knob } from 'primereact/knob';

const PointsSummary = () => {
    const currentPoints = useSelector(state => state.statusPoints.currentPoints);
    const pointsAfterTierReached = useSelector(state => state.statusPoints.pointsAfterTierReached);
    const currentTier = useSelector(state => state.statusPoints.currentTier);
    const retention = useSelector(state => state.settings.retention);
    const points = useSelector(state => state.settings.points);

    const { silver, gold, elite } = points;
    const nextTier = cond([
        [gte(__, elite), always(Infinity)],
        [gte(__, gold), always(elite)],
        [gte(__, silver), always(gold)],
        [T, always(silver)]
    ])(currentPoints);

    return (
        <Card className="border-1">
            <div className="flex flex-column">
                <h2 className="flex justify-content-center">Points Summary</h2>
                <div className="flex justify-content-around">
                    <Knob min={0} max={nextTier} value={Math.trunc(currentPoints)} valueColor={"rgb(255, 215, 0)"} readOnly />
                    {
                        currentTier !== "none"
                            ? <Knob min={0} max={Math.trunc(points[currentTier] * (retention / 100))} value={Math.trunc(pointsAfterTierReached)} valueColor={"rgb(192, 192, 192)"} readOnly />
                            : null
                    }
                </div>
            </div>
        </Card>
    );
};

export default PointsSummary;