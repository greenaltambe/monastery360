import mongoose from "mongoose";

const monasterySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    district: {
        type: String,
        enum: ["East", "West", "North", "South"],
    },
    location: {
        latitude: { type: Number, default: null },
        longitude: { type: Number, default: null },
    },
    description: {
        type: String,
    },
    established: {
        type: String,
    },
    founder: {
        type: String,
    },
    images: [
        {
            url: String,
            caption: String,
        },
    ],
    source: {
        type: String,
    },
});

export default mongoose.model("Monastery", monasterySchema);
