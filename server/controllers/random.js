const liveData = {};

const updateLiveData = ({ username, email, primaryLanguage, learnLanguage }) => {
    const key = username;
    liveData[primaryLanguage][key] = learnLanguage;
}

const findMatches = ({ username, email, primaryLanguage, learnLanguage }) => {
    if (learnLanguage in liveData) {
        // all users
        const targetUsers = Object.keys(liveData[learnLanguage]);

        // filter users only with a match
        const matchingUsers = targetUsers.filter((tu) => liveData[learnLanguage][tu] === primaryLanguage);

        if (matchingUsers) {
            return matchingUsers;
        };
    }

    return [];
}

const randomController = {
    handleRandomUsersSearch: async (req, res) => {
        const { username, email, primaryLanguage, learnLanguage } = req.body;

        if (!(primaryLanguage in liveData)) {
            liveData[primaryLanguage] = {};
        }

        updateLiveData({ username, email, primaryLanguage, learnLanguage });


        const matches = findMatches({ username, email, primaryLanguage, learnLanguage });

        return res.status(200).json({ "matches": matches });
    }
};

export default randomController;