import { useDispatch, useSelector } from "react-redux";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

import useDynamoDbClient from "../clients/useDynamoDbClient";
import { addStatusPointsSuccess } from "../reducers/statusPoints";

const useSavePoints = () => {
    const dispatch = useDispatch();
    const client = useDynamoDbClient();
    const email = useSelector(state => state.userProfile.email);

    return async ({ date, type, points }) => {
        await client.current.send(new PutCommand({
            TableName: "status-points-points",
            Item: {
                email,
                earnedDate: date.toISODate(),
                type,
                points
            }
        }));

        dispatch(addStatusPointsSuccess({ date: date.toISODate(), type, points }));
    };
};

export default useSavePoints;