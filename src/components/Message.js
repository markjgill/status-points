import { useSelector } from "react-redux";
import { always, cond, equals, T } from "ramda";
import { Card } from "primereact/card";

import useTotalCurrentPoints from "../utils/useTotalCurrentPoints";
import useCurrentTier from "../utils/useCurrentTier";
import usePointsAfterTierReached from "../utils/usePointsAfterTierReached";

const Message = () => {
    const retention = useSelector(state => state.settings.retention);
    const points = useSelector(state => state.settings.points);

    const currentPoints = useTotalCurrentPoints();
    const currentTier = useCurrentTier();
    const pointsAfterTierReached = usePointsAfterTierReached();

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