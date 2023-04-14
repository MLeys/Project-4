import mongoose from "mongoose";
const Schema = mongoose.Schema;

const resourceSchema = new Schema(
  {
    // userCreated:  {type: Schema.Types.ObjectId, ref: 'User', autopopulate: true},
    title: String,
    videoId: String,
    description: String,
    thumbnail: String,
    datePublished: String,
    skillId: String,
    subSkillId: String,
    source: { type: String, default: "youtube" },
    usersAssigned: [
      { type: Schema.Types.ObjectId, ref: "User", autopopulate: true },
    ],
    //
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

resourceSchema.virtual("formattedCreatedAt").get(function () {
  console.log("Resource:", this); // Add this line to log the resource object

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
