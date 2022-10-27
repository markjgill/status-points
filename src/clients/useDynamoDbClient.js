import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";

const useDynamoDbClient = () => {
    const client = useRef();
    const idToken = useSelector(state => state.authentication.idToken);
    const identityProvider = useSelector(state => state.authentication.identityProvider);

    useEffect(() => {
        const dynamodbClient = new DynamoDBClient({
            region: "ap-southeast-2",
            credentials: fromCognitoIdentityPool({
                clientConfig: {
                    region: "ap-southeast-2"
                },
                identityPoolId: "ap-southeast-2:55a5b2bf-6a27-484f-a87a-fa4ddd7f7c6c",
                ...(
                    idToken && identityProvider && {
                        logins: {
                            [identityProvider]: idToken
                        }
                    }
                )
            })
        });

        client.current = DynamoDBDocumentClient.from(dynamodbClient);
    }, [idToken, identityProvider]);

    return client;
}

export default useDynamoDbClient;