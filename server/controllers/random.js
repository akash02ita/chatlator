const liveSearchData = {};
const livePairRequestData = {};
const livePairRequestStatusData = {};


const updateLiveData = ({ email, name, primaryLanguage, learnLanguage }) => {
    const key = email;
    liveSearchData[primaryLanguage][key] = [name, learnLanguage];
}

const findMatches = ({primaryLanguage, learnLanguage }) => {
    if (learnLanguage in liveSearchData) {
        // all users
        const targetUsersGuid = Object.keys(liveSearchData[learnLanguage]);

        // filter users only with a match
        const matchingUsersGuid = targetUsersGuid.filter((tu) => liveSearchData[learnLanguage][tu][1] === primaryLanguage);

        if (matchingUsersGuid) {
            return matchingUsersGuid.map((tu) => [tu, liveSearchData[learnLanguage][tu][0]]);
        };
    }

    return [];
}
// This part here, is the only one building a response. Two const above support this.
const randomController = {
    handleRandomUsersSearch: async (req, res) => { // why async? does it need to be?
        // When we get a user, it does not come with learnLanguage in the "user" object.
        const { email, name, primaryLanguage, learnLanguage } = req.body;

        if (!(primaryLanguage in liveSearchData)) {
            liveSearchData[primaryLanguage] = {};
        }

        updateLiveData({ email, name, primaryLanguage, learnLanguage });


        const matches = findMatches({ primaryLanguage, learnLanguage });
        const pairuprequests = livePairRequestData[email] ? livePairRequestData[email] : {};

        return res.status(200).json({ "matches": matches, "pairuprequests": pairuprequests});
    },

    handlePairUpRequest: async (req, res) => {

    },

    handlePairUpConfirmation: async (req, res) => {

    },

    handlePairStatus: async (req, res) => {

    }
};

export default randomController;