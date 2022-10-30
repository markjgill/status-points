import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DateTime } from "luxon";
import { sortBy, prop } from "ramda";
import { QueryCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

import useDynamoDbClient from "../clients/useDynamoDbClient";
import { fetchStatusPointsSuccess } from "../reducers/statusPoints";

const sortByDate = sortBy(prop("date"));

const useFetchPoints = () => {
    const dispatch = useDispatch();
    const client = useDynamoDbClient();
    const email = useSelector(state => state.userProfile.email);
;
    useEffect(() => {
        (async () => {
            console.info("Fetch Status Points");

            const { Items } = await client.current.send(new QueryCommand({
                TableName: "status-points-points",
                ExpressionAttributeValues: {
                    ":email": { S: email },
                    ":from": { S: DateTime.now().startOf("day").minus({ months: 15 }).toISODate() }
                },
                KeyConditionExpression: "email = :email and earnedDate >= :from"
            }));

            const data = Items.map(item => unmarshall(item))
                .map(({ earnedDate, type, points }) => ({ date: DateTime.fromISO(earnedDate), type, points }));

            dispatch(fetchStatusPointsSuccess(sortByDate(data)));
        })();
    }, [dispatch, client, email]);
};

export default useFetchPoints;