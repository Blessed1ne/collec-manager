// require the stuff
const mongoose = require("mongoose")
// do the stuff

// define the schema
const albumSchema = new mongoose.Schema({
  album: { type: String, required: true },
  artist: { type: String, required: true },
  price: { type: Number, required: true },
  genre: { type: String, required: true },
})

const Album = mongoose.model("Album", albumSchema)
// create a model using that schema

// export the stuff
module.exports = Album
