export const getMatchedUserInfo = (users: { [id: string]: Profile; }, userLoggedIn: string) =>
{
    const newUsers = { ...users };
    delete newUsers[userLoggedIn];

    const [id, user] = Object.entries(newUsers).flat();
    return { ...(user as Profile), id: (id as string) };
};