const liveData = {};

const whoIsLookingForRP = {}; // Who is looking for random people

const whoIsTryingTo_PU = {}; // Who is trying to pair up.
// Might need to be some sort of dictionary? 
    // In essence, each user, is gonna have another structure, could be a list, Vector, Array.
    // but all those elements in there would indicate that these "elements/users" have an interest 
    // in having a chat with the user of the "key"
        // so maybe the data structure could be a Dictionary.
            // inside of it, there are key (probably just the GUID), this gets mapped to -> Vector/Array 
    // When the user sends a request to see who is trying to pair, the Vector/Array could get sent back?



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
// This part here, is the only one building a response. Two const above support this.
const randomController = {
    handleRandomUsersSearch: async (req, res) => { // why async? does it need to be?
        // When we get a user, it does not come with learnLanguage in the "user" object.
        const { username, email, primaryLanguage, learnLanguage } = req.body;

        if (!(primaryLanguage in liveData)) {
            liveData[primaryLanguage] = {};
        }

        updateLiveData({ username, email, primaryLanguage, learnLanguage });


        const matches = findMatches({ username, email, primaryLanguage, learnLanguage });

        return res.status(200).json({ "matches": matches });
    }
};


// Route for a stranger to add themselves to the array inside the Dictionary
// The key the stranger provides would be the person (the other stranger) that 
// they want to talk to.
randomController.statics.addMyself_ToStrList = (req, res) => {
    
}


// const randomController = { handleRandomUsers_PR };

// basically what the function would look like under the "model" directory.
randomController.statics.handleRandomUsers_PR = async(req, res) => { // Handle Random Users Pair Request.
    const { username, email, primaryLanguage, learnLanguage } = req.body;
    
}

export default randomController;