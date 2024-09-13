const express = require('express');
const mongoose = require('mongoose');

// Define the schema
const menSchema = new mongoose.Schema({
  sid: {
    type: String,
    required: true,  // Corrected from 'require' to 'required'
    unique: true
  },
  name: {
    type: String,
    required: true,  // Corrected from 'require' to 'required'
    unique: true
  },
  age: {
    type: Number,
    required: true,  // Corrected from 'require' to 'required'
    unique: true
  }
});

// Create the model and assign it to a meaningful collection name
const MesRanking = new mongoose.model("MesRanking", menSchema); 

module.exports = MesRanking;
