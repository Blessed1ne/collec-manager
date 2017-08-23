const express = require("express")
const router = express.Router()
const Album = require("../models/Album")

router.get("/", function(req, res) {
  Album.find().then(function(albums) {
    res.render("index", {
      albums: albums
    })
  })
})

router.get("/albums/new", function(req, res) {
  res.render("new")
})

router.post("/albums", function(req, res) {
  const albumName = req.body.album
  const artist = req.body.artist
  const price = req.body.price
  const genre = req.body.genre
  const album = new Album()
  album.album = albumName
  album.artist = artist
  album.price = price
  album.genre = genre
  console.log(album);
  album
    .save()
    .then(function(album) {
      res.redirect("/")
    })
    .catch(function(error) {
      console.log("error", error)
      res.render("new", {
        album: album,
        errors: error.errors
      })
    })
})

router.post("/albums/:id", function(req, res) {
  Album.findOne({ _id: req.params.id }).then(function(album) {
    const albumName = req.body.album
    const artist = req.body.artist
    const price = req.body.price
    const genre = req.body.genre
    album.album = albumName
    album.artist = artist
    album.price = price
    album.genre = genre
    album
      .save()
      .then(function(album) {
        res.redirect("/")
      })
      .catch(function(error) {
        res.render("edit", {
          album: album,
          errors: error.errors
        })
      })
  })
})

router.get("/albums/:id", function(req, res) {
  Album.findOne({ _id: req.params.id }).then(function(album) {
    res.render("detail", {
      album: album
    })
  })
})

router.get("/albums/:id/edit", function(req, res) {
  Album.findOne({ _id: req.params.id }).then(function(album) {
    res.render("edit", {
      album: album
    })
  })
})

router.get("/albums/:id/delete", function(req, res) {
  Album.deleteOne({ _id: req.params.id }).then(function() {
    res.redirect("/")
  })
})

module.exports = router
