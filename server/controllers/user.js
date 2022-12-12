import UserModel, { PRIMARY_LANGUAGES } from "../models/user.js";

const usersController = {
    handleCreateUser: async (req, res) => {
        try {
            const { name, email, password, primaryLanguage } = req.body;
            const newUser = await UserModel.createUser(name, email, password, primaryLanguage);
            return res.status(200).json({ success: true, message:"Account successfully created", user: newUser });
        } catch(error) {
            return res.status(500).json({ success: false, message:"Error creating the account", error: error });
        }
    },


    handleFindUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            const givenUser = await UserModel.findUser(email, password);
            return res.status(200).json({ success: true, message: "Login Successful", user: givenUser });
        } catch(error) {
            return res.status(500).json({ success: false, message: "Login Unsuccessful", error: error });
        }
    },
};

export default usersController;