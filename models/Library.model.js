const { Schema, model, default: mongoose } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const librarySchema = new Schema(
  {
    libname: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const LibraryModel = model("Library", librarySchema);

module.exports = LibraryModel;