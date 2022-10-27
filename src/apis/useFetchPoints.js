import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GetCommand } from "@aws-sdk/lib-dynamodb";

import useDynamoDbClient from "../clients/useDynamoDbClient";
import { fetchSettingsSuccess } from "../reducers/settings";

const useFetchPoints = () => {
    const dispatch = useDispatch();
    const client = useDynamoDbClient();
;
    useEffect(() => {
        (async () => {
            const { Item } = await client.current.send(new GetCommand({
                TableName: "status-points-points",
                Key: { "id": 0 }
            }));

            const { silver, gold, elite, retention } = Item;
            dispatch(fetchSettingsSuccess({ silver, gold, elite, retention }));
        })();
    }, [dispatch, client]);
};

export default useFetchPoints;