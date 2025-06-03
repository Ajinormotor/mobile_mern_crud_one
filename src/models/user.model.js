import mongoose, { Schema } from "mongoose";
import bcryptjs from "bcryptjs"
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema({
    username: { type:String, required: true, unique: true, minlength:4},
    email: { type:String, required: true, unique: true},
    password: {type: String, minlength:4, required: true},
    profileImage: {type: String, default: ''}
}, {timestamps: true})



userSchema.pre("save",  async function(next) {
    if(!this.isModified('password')) return next();

    const salt = await bcryptjs.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)

    next()

})

userSchema.methods.comparePassword = async function(userPasswords) {
    return await bcrypt.compare(userPasswords, this.password)
    
}

const User = mongoose.model('User', userSchema)

export default User