import { useSelector } from "react-redux";
import { always, cond, equals, T } from "ramda";
import { Card } from "primereact/card";

import useTotalCurrentPoints from "../utils/useTotalCurrentPoints";
import usePointsAfterTierReview from "../utils/usePointsSinceTierReview";
import useCurrentTier from "../utils/useCurrentTier";

const Message = () => {
    const retention = useSelector(state => state.settings.retention);
    const points = useSelector(state => state.settings.points);

    const currentPoints = useTotalCurrentPoints();
    const currentTier = useCurrentTier();
    const pointsAfterTierReview = usePointsAfterTierReview();

    const nextTier = cond([
        [equals("silver"), always("gold")],
        [equals("gold"), always("elite")],
        [equals("elite"), always("elite")],
        [T, always("silver")]
    ])(currentTier);

    const pointsToReachNextTier = points[nextTier] - Math.trunc(currentPoints);
    const pointsToRetainCurrentTier = points[currentTier] * (retention / 100) - Math.trunc(pointsAfterTierReview);

    const tierMessage = `You are ${pointsToReachNextTier} points away from ${nextTier} status`;
    const retentionMessage = `and ${pointsToRetainCurrentTier} points away from retaining ${currentTier} status`;

    return (
        <Card className="border-1 bg-green-200">
            <h4 className="m-0 text-center">{tierMessage}</h4>
            { 
                currentTier !== "none" && pointsToRetainCurrentTier > 0
                    ? <h4 className="m-0 text-center">{retentionMessage}</h4>
                    : null
            }
        </Card>
   );
};

export default Message;