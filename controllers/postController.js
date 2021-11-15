const post = require("../models/postModel.js");

const getAllPost = async (req, res, next) => {
  try {
    const posts = await post.find();
    return res.status(200).json({
      success: true,
      results: posts.length,
      data: {
        posts,
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      success: false,
    });
  }
};

const getPostById = async (req, res, next) => {
  try {
    const rs = await post.findById(req.params.id);
    return res.status(200).json({
      success: true,
      data: {
        rs,
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      success: false,
    });
  }
};

const createPost = async (req, res, next) => {
  try {
    const rs = await post.create(req.body);
    return res.status(200).json({
      success: true,
      data: {
        rs,
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      success: false,
    });
  }
};
const updatePostById = async (req, res, next) => {
  try {
    const rs = await post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      data: {
        rs,
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      success: false,
    });
  }
};
const deletePostById = async (req, res, next) => {
  try {
    const rs = await post.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      success: false,
    });
  }
};
module.exports = {
  getAllPost,
  getPostById,
  createPost,
  updatePostById,
  deletePostById,
};
