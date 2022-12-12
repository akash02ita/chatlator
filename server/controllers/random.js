const liveSearchData = {};
const livePairRequestData = {};
const livePairRequestStatusData = {};


const updateLiveData = ({ username, email, primaryLanguage, learnLanguage }) => {
    const key = username;
    liveSearchData[primaryLanguage][key] = learnLanguage;
}

const findMatches = ({ username, email, primaryLanguage, learnLanguage }) => {
    if (learnLanguage in liveSearchData) {
        // all users
        const targetUsers = Object.keys(liveSearchData[learnLanguage]);

        // filter users only with a match
        const matchingUsers = targetUsers.filter((tu) => liveSearchData[learnLanguage][tu] === primaryLanguage);

        if (matchingUsers) {
            return matchingUsers;
        };
    }

    return [];
}
// This part here, is the only one building a response. Two const above support this.
const randomController = {
    handleRandomUsersSearch: async (req, res) => { // why async? does it need to be?
        // When we get a user, it does not come with learnLanguage in the "user" object.
        const { username, email, primaryLanguage, learnLanguage } = req.body;

        if (!(primaryLanguage in liveSearchData)) {
            liveSearchData[primaryLanguage] = {};
        }

        updateLiveData({ username, email, primaryLanguage, learnLanguage });


        const matches = findMatches({ username, email, primaryLanguage, learnLanguage });

        return res.status(200).json({ "matches": matches });
    },

    handlePairUpRequest: async (req, res) => {

    },

    handlePairUpConfirmation: async (req, res) => {

    },

    handlePairStatus: async (req, res) => {

    }
};

export default randomController;