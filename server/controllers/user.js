import UserModel, { PRIMARY_LANGUAGES } from "../models/user.js";

const usersController = {
<<<<<<< Updated upstream
    getOneUser: async (req, res) => {
        // This here looks hard coded.

        return res.status(200).json({
            guid: "12d9d84c2cf243f1ae8754d5d8883087",
            name: "ABC",
            username: "userABC",
            email: "abc@gmail.com",
            primaryLanguage: 'English'
        })
    },

=======
>>>>>>> Stashed changes
    handleCreateUser: async (req, res) => {
        try {
            const { name, email, password, primaryLanguage } = req.body;
            const newUser = await UserModel.createUser(name, email, password, primaryLanguage);
            return res.status(200).json({ success: true, message:"Account successfully created", user: newUser });
        } catch(error) {
            return res.status(500).json({ success: false, message:"Error creating the account", error: error });
        }
    },


<<<<<<< Updated upstream
    handleGetUsers: async (req, res) => {
        try { // 
            const allUsers = await UserModel.getUsers();
            return res.status(200).json({ success: true, allUsers });
=======
    handleFindUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            const givenUser = await UserModel.findUser(email, password);
            return res.status(200).json({ success: true, message: "Login Successful", user: givenUser });
>>>>>>> Stashed changes
        } catch(error) {
            return res.status(500).json({ success: false, message: "Login Unsuccessful", error: error });
        }
    },
};

export default usersController;