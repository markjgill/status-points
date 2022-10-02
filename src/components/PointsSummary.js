import { useSelector } from 'react-redux';
import { always, cond, gte, T, __ } from 'ramda';
import { Card } from 'primereact/card';
import { Knob } from 'primereact/knob';

const PointsSummary = () => {
    const currentPoints = useSelector(state => state.statusPoints.currentPoints);
    const { silver, gold, elite } = useSelector(state => state.settings.points);

    const max = cond([
        [gte(__, elite), always(Infinity)],
        [gte(__, gold), always(elite)],
        [gte(__, silver), always(gold)],
        [T, always(silver)]
    ])(currentPoints);

    return (
        <Card className="border-1">
            <div className="flex flex-column">
                <h2 className="flex justify-content-center">Points Summary</h2>
                <div className="flex justify-content-center">
                    <Knob min={0} max={max} value={Math.trunc(currentPoints)} valueColor={"rgb(0, 255, 0)"} readOnly />
                </div>
            </div>
        </Card>
    );
};

export default PointsSummary;