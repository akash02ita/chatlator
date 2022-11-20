
const usersController = {
    getOneUser: async (req, res) => {
        return res.status(200).json({
            guid: "12d9d84c2cf243f1ae8754d5d8883087",
            name: "ABC",
            username: "userABC",
            email: "abc@gmail.com",
            primaryLanguage: 'English'
        })
    },
};

export default usersController;