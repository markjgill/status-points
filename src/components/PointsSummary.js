import React from 'react';
import { useSelector } from 'react-redux';
import { always, cond, gte, T, __ } from 'ramda';
import { Card } from 'primereact/card';
import { ProgressBar } from 'primereact/progressbar';

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

    const nextTierPercentage = (Math.trunc(currentPoints) / nextTier) * 100;
    const retentionPercentage = (Math.trunc(pointsAfterTierReached) / (Math.trunc(points[currentTier] * (retention / 100)))) * 100;

    return (
        <Card className="border-1">
            <div className="flex flex-column">
                <h2 className="flex justify-content-center">Points Summary</h2>
                <div className="m-2">
                    <div>
                        <ProgressBar className="h-2rem" value={nextTierPercentage} showValue={false} color="rgb(255, 215, 0)"></ProgressBar>
                        <h4 className="m-1 text-right">{Math.trunc(currentPoints)} out of {nextTier}</h4>
                    </div>
                </div>
                {
                    currentTier !== "none"
                        ? <div className="m-2">
                            <ProgressBar className="h-2rem" value={retentionPercentage} showValue={false} color="rgb(150, 150, 150)"></ProgressBar>
                            <h4 className="m-1 text-right">{Math.trunc(pointsAfterTierReached)} out of {Math.trunc(points[currentTier] * (retention / 100))}</h4>
                          </div>
                        : null
                }
            </div>
        </Card>
    );
};

export default PointsSummary;