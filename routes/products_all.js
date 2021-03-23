const express = require("express");
const router = express.Router();

const listOfProducts = [
  {
    "_id": "5bd761dcae323e45a93cc771",
    "name": "envelopes",
    "tags": ["stationary", "office", "general"],
    "price": "5.04",
    "quantity": "8"
  },
  {
    "_id": "5bd761dcae323e45a93abf2",
    "name": "binder",
    "tags": ["school", "general", "organization"],
    "price": "11.61",
    "quantity": "7"
  },
  {
    "_id": "5bd761dcae323e45a9311231",
    "name": "notepad",
    "tags": ["office", "writing", "school"],
    "price": "5.83",
    "quantity": "5"
  },
  {
    "_id": "5bd761dcae323e45a9zwda1",
    "name": "binder",
    "tags": ["school", "general", "organization"],
    "price": "18.72",
    "quantity": "2"
  },
  {
    "_id": "5bd761dcae323e45a9awdacw",
    "name": "backpack",
    "tags": ["school", "travel", "kids"],
    "price": "116.93",
    "quantity": "1"
  },
  {
    "_id": {
      "$oid": "604e715dcc0bd01140e60c22"
    },
    "name": "staples",
    "tags": ["writing", "office", "school"],
    "quantity": "200",
    "price": "1.19",
  },
  {
    "_id": {
      "$oid": "604e71a99ad46e4b45ca7c55"
    },
    "name": "staples",
    "tags": ["writing", "office", "school"],
    "quantity": "200",
    "price": "1.19",
  },
  {
    "_id": {
      "$oid": "604e7a1fcff8422010dde3d1"
    },
    "name": "envelopes",
    "tags": ["stationary", "office", "general"],
    "price": "6.04",
    "quantity": "20"
  },
  {
    "_id": {
      "$oid": "604fcdaf6ad66611a575a8f7"
    },
    "name": "staples",
    "tags": ["writing", "office", "school"],
    "quantity": "100",
    "price": "0.89",
  }
];

router.get("/", (req, res, next) => {
  res.json(listOfProducts)
});

module.exports = router;
