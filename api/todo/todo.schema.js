const mongoose = require("mongoose");
const { Schema } = mongoose;
const mongoosePaginate = require("mongoose-paginate-v2");

const todoSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    date: { type: String, required: true },
    category: { type: String, default: "no category" },
  },
  { versionKey: false }
);

todoSchema.plugin(mongoosePaginate);

const todoModel = mongoose.model("todo", todoSchema);

module.exports = todoModel;
