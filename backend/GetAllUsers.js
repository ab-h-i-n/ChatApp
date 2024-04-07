import User from "./UserSchema.js";

const getAllUsers = (id) => {
    const currentUser =  id;
    var allUsers = [];

    User.find({ _id: { $ne: currentUser } }, '_id name about profilePhoto onlineStatus friendList')
        .then(users => {
            allUsers = users
        })
        .catch(error => {
            allUsers = [{error : 'User not found!'}]
        }).then(()=>{
            return allUsers
        })

}

export default getAllUsers