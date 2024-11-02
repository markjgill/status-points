import { useSelector } from "react-redux";
import { always, cond, gte, T, __ } from "ramda";
import { Card } from "primereact/card";
import { ProgressBar } from "primereact/progressbar";

import useTotalCurrentPoints from "../utils/useTotalCurrentPoints";
import usePointsAfterTierReview from "../utils/usePointsSinceTierReview";
import useCurrentTier from "../utils/useCurrentTier";

const PointsSummary = () => {
    const retention = useSelector(state => state.settings.retention);
    const points = useSelector(state => state.settings.points);

    const currentPoints = useTotalCurrentPoints();
    const pointsAfterTierReview = usePointsAfterTierReview();
    const currentTier = useCurrentTier();

    const { silver, gold, elite } = points;
    const { nextTierPoints, color, nextTierColor } = cond([
        [gte(__, elite), always({ nextTierPoints: Infinity, color: 'rgb(224, 211, 181)', nextTierColor: 'rgb(224, 211, 181)' })],
        [gte(__, gold), always(({ nextTierPoints: elite, color: 'rgb(255, 215, 0)', nextTierColor: 'rgb(224, 211, 181)' }))],
        [gte(__, silver), always(({ nextTierPoints: gold, color: 'rgb(192, 192, 192)', nextTierColor: 'rgb(255, 215, 0)' }))],
        [T, always(({ nextTierPoints: silver, color: 'rgb(0, 186, 107)', nextTierColor: 'rgb(192, 192, 192)' }))]
    ])(currentPoints);

    const nextTierPercentage = (Math.trunc(currentPoints) / nextTierPoints) * 100;
    const retentionPercentage = (Math.trunc(pointsAfterTierReview) / (Math.trunc(points[currentTier] * (retention / 100)))) * 100;

    return (
        <Card className="border-1">
            <div className="flex flex-column">
                <h2 className="flex justify-content-center m-1">Points Summary</h2>
                <div className="m-3">
                    <div>
                        <ProgressBar className="h-2rem" value={nextTierPercentage} showValue={false} color={nextTierColor}></ProgressBar>
                        <div className="flex justify-content-between">
                            <h4 className="my-1 mx-0">{Math.trunc(currentPoints)} out of {nextTierPoints}</h4>
                            <h4 className="my-1 mx-0">{nextTierPoints - Math.trunc(currentPoints)} remaining</h4>
                        </div>
                    </div>
                </div>
                <div className="m-3">
                    <ProgressBar className="h-2rem" value={retentionPercentage} showValue={false} color={color}></ProgressBar>
                    <div className="flex justify-content-between">
                        <h4 className="my-1 mx-0">{Math.trunc(pointsAfterTierReview)} out of {Math.trunc(points[currentTier] * (retention / 100))}</h4>
                        <h4 className="my-1 mx-0">{Math.trunc(points[currentTier] * (retention / 100)) - Math.trunc(pointsAfterTierReview)} remaining</h4>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default PointsSummary;