
const usersController = {
    getOneUser: async (req, res) => {
        return res.status(200).json({
            id: "dfjknfdkjnfdkj23dnjdsnfjsdn",
            name: "ABC",
            username: "userABC",
            email: "abc@gmail.com",
            primaryLanguage: 'English'
        })
    },
};

export default usersController;