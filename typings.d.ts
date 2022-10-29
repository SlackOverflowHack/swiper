type Profile = {
    photoUrl: string,
    id: string,
    job: string,
    displayName: string,
    age: string,
    timestamp: Date;
};

type Match = {
    users: {
        [key: string]: Profile;
    },
    usersMatched: string[],
};

interface ChatMatch extends Match
{
    id: string;
}

type Message = {
    message: string;
    id: string;
    userId: string;
};