import mongoose,{InferSchemaType} from "mongoose";
import { UserSchema } from "../models/userSchema";
const model = mongoose.model('user',UserSchema);

type User = InferSchemaType<typeof UserSchema>;

const UserRepository = {
    async register(data:User):Promise<void>{
        const user = new model(data);
            await user.save();
    }
}

export default UserRepository;