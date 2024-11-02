import { Card } from "primereact/card";

import useTotalCurrentPoints from "../utils/useTotalCurrentPoints";
import useCurrentTier from "../utils/useCurrentTier";

const Message = () => {
    const currentPoints = useTotalCurrentPoints();
    const currentTier = useCurrentTier();

    return (
        <Card className="border-1 bg-green-200">
            <h3 className="m-0 text-center">
                You currently hold {currentTier} status with {currentPoints} points.
            </h3>
        </Card>
   );
};

export default Message;