import { useSelector } from "react-redux";
import { always, cond, equals, gte, T, __ } from "ramda";
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
        [gte(__, elite), always({ nextTierPoints: Infinity, color: 'rgb(150, 150, 150)', nextTierColor: 'rgb(150, 150, 150)' })],
        [gte(__, gold), always(({ nextTierPoints: elite, color: 'rgb(255, 215, 0)', nextTierColor: 'rgb(150, 150, 150)' }))],
        [gte(__, silver), always(({ nextTierPoints: gold, color: 'rgb(192, 192, 192)', nextTierColor: 'rgb(255, 215, 0)' }))],
        [T, always(({ nextTierPoints: silver, color: 'rgb(0, 186, 107)', nextTierColor: 'rgb(192, 192, 192)' }))]
    ])(currentPoints);

    const nextTier = cond([
        [equals("silver"), always("gold")],
        [equals("gold"), always("elite")],
        [equals("elite"), always("elite")],
        [T, always("silver")]
    ])(currentTier);

    const nextTierPercentage = (Math.trunc(currentPoints) / nextTierPoints) * 100;
    const retentionPercentage = (Math.trunc(pointsAfterTierReview) / (Math.trunc(points[currentTier] * (retention / 100)))) * 100;

    return (
        <Card className="border-1">
            <div className="flex flex-column">
                <h2 className="flex justify-content-center m-1">Points Summary</h2>
                <div className="m-2">
                    <div>
                        <h4 className="m-1">To achieve {nextTier} status...</h4>
                        <ProgressBar className="h-2rem" value={nextTierPercentage} showValue={false} color={nextTierColor}></ProgressBar>
                        <h4 className="m-1 text-right">{Math.trunc(currentPoints)} out of {nextTierPoints}</h4>
                    </div>
                </div>
                {
                    currentTier !== "none" && retentionPercentage < 100
                        ? (
                            <div className="m-2">
                                <h4 className="m-1">To retain {currentTier} status...</h4>
                                <ProgressBar className="h-2rem" value={retentionPercentage} showValue={false} color={color}></ProgressBar>
                                <h4 className="m-1 text-right">{Math.trunc(pointsAfterTierReview)} out of {Math.trunc(points[currentTier] * (retention / 100))}</h4>
                            </div>
                        )
                        : (
                            <div className="m-2">
                                <h3 className="text-center">You have retained {currentTier} status</h3> 
                            </div>
                        )
                }
            </div>
        </Card>
    );
};

export default PointsSummary;