// create all handlers for out routes
 import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find(); //find messages in db
        res.status(200).json(postMessages)
    } catch (error) {
        res.status(404).json({message: error})
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage(post);
    try {
        await newPost.save()
        res.status(200).json(newPost)
    } catch (error) {
        res.status(404).json({message:error})
    }
}

export const updatePost = async (req, res) => {
    const { id: _id} = req.params;
    const post = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post is with that id');
    const updatePost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, { new: true });
    res.json(updatePost);
}

export const deletePost = async(req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post is with that id');
    await PostMessage.findByIdAndRemove(id);
    res.json({message: 'Post Deleted Successfully!!'});
}

export const likePost = async (req, res) => {
    const { id }  = req.params;

    if(!req.userId) return res.json({message:'Unauthorized!!'});
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post is with that id');
    const post = await PostMessage.findById(id);

    const index = post.likes.findById((id) => id === String(req.userId));

    if(index === -1){
        //like a post
        post.likes.push(req.userId)
    }else{
        //dislike a post
        post.likes = post.filter((id) => id === String(req.userId))
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true})
    res.json(updatedPost)
}