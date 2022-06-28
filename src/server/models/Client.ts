import { model, Schema } from "mongoose";

export interface ClientInterface {
    name: string,
    email: string,
    phone: string
}

const ClientSchema = new Schema<ClientInterface>({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    phone: {
        type: String,
    }
}, {
    timestamps: true
});

export default model<ClientInterface>('Client', ClientSchema);
