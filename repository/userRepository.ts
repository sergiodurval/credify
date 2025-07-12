import mongoose,{InferSchemaType, Mongoose} from "mongoose";
import { UserSchema } from "../models/userSchema";
const model = mongoose.model('user',UserSchema);

// Ensure _id is included in the type definition
type User = InferSchemaType<typeof UserSchema> & { _id: mongoose.Types.ObjectId };

const UserRepository = {
    async register(data: Omit<User, "_id">): Promise<string> {
        const user = new model(data);
        await user.save();
        return user._id.toString();
    },
    async findByEmail(email:string):Promise<User| null>{
        return await model.findOne({email:email})
    },
    async findById(userId:string):Promise<User| null>{
        return await model.findById(userId);
    }
}

export default UserRepository;