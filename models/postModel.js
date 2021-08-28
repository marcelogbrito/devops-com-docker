const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    require: [true, "Post precisa ter um titulo"]
},
  body: {
    type: String,
    required: [true, "Post deve ter um corpo"]
  }
})

const Post = mongoose.model("Post", postSchema)

module.exports = Post;
