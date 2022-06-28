import { model, Schema } from "mongoose";
import { ClientInterface } from "./Client";
const mongoose = require("mongoose");

interface ProjectInterface {
    name: string,
    description: string,
    status: string,
    client: ClientInterface
}

const ProjectSchema = new Schema<ProjectInterface>({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
    },
    status: {
        type: String,
        enum: ['Not started', 'In Progress', 'Completed'],
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    }
}, {
    timestamps: true
});

export default model<ProjectInterface>('Project', ProjectSchema);
