import mongoose from "mongoose";
const Schema = mongoose.Schema;

const resourceSchema = new Schema(
  {
    title: String,
    videoId: String,
    description: String,
    thumbnail: String,
    datePublished: String,
    subSkillId: String,
    skillId: String,
    source: { type: String, default: "youtube" },
    usersAssigned: [{type: Schema.Types.ObjectId, ref: "User", autopopulate: true }],
    usersComplete: [{type: Schema.Types.ObjectId, ref: "User", autopopulate: true }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

resourceSchema.virtual("formattedCreatedAt").get(function () {

  if (!this.createdAt) {
    return ""; // or return a specific message like "Not available"
  }

  const formattedDate = this.createdAt.toLocaleDateString("en-US", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });

  const formattedTime = this.createdAt.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return `${formattedDate} ${formattedTime}`;
});

export default mongoose.model("Resource", resourceSchema);
