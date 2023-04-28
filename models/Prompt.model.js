const { Schema, model, default: mongoose } = require("mongoose");

const promptSchema = new Schema(
    {
        prompt: {
            type: String,
            required: true,
        },
        response: {
            type: String,
            required: true,
        },
        libraryid: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Library',
          },
    },
    {
      // this second object adds extra properties: `createdAt` and `updatedAt`    
      timestamps: true
    }
  );

  const PromptModel = model("Prompt", promptSchema);

module.exports = PromptModel;