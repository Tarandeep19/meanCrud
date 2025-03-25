const User=require("../db/user");

async function addUser(userModel){
    let user=new User({
        ...userModel
});
await user.save();
return user.toObject();
}

async function getUsers(){
    const users=await User.find();
    return users.map(x=>x.toObject());
};
async function getUser(id){
    const user=await User.findById(id);
    return user.toObject();
};

async function updateUser(id,update){
    const filter={_id:id};
    await User.findOneAndUpdate(filter, update, { new: true });
}

async function deleteUser(id){
    const user=await User.findByIdAndDelete(id);
};

module.exports={addUser,getUsers, getUser, updateUser,deleteUser};