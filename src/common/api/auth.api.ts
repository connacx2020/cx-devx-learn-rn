import { getUserInfoByIdSchema } from '../../common/graphQL';
import { graphqlClient } from '../graphQL/graphql.config';

export const getUserInfoByIDApi = (userID: string) => {
    return getUserByIDHandler(userID);
}

export async function getUserByIDHandler(userID: string) {
    return await graphqlClient.query({
        query: getUserInfoByIdSchema,
        variables: { userID }
    })
}
