const express = require('express')
const blogRouter = require('../controllers/blog')
const app = express()

const dummy = (blogs) => {
    if (Array.isArray(blogs)) {
      return 1;
    } else {
      return 0;
    }
  };
  
  module.exports = {
    dummy
  };