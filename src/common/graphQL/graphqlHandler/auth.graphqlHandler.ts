import { User } from '../../../models';
import { graphqlClient } from '../graphql.config';
import { getUserInfoByIdSchema } from '../graphqlSchema/auth.graphqlSchema';

export async function getUserByIDHandler(
    userID: string,
): Promise<{ data: { getUserInfoByID: User } }> {
    try {
        return await graphqlClient.query({
            query: getUserInfoByIdSchema,
            variables: { userID },
        });
    } catch (error) {
        return error;
    }
}
