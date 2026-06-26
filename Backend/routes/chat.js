import express from "express";
import Thread from "../models/Thread.js";
import getOpenRouterAPIResponse from "../utils/openai.js";

const router = express.Router();

//Test route
router.post("/test", async (req, res) => {
    try{
        const thread = new Thread({
            threadId: "abc123",
            title:"Testing new thread2",
        });
        const response = await thread.save();
        res.send(response);
    }catch(error){
        console.log(error);
        res.status(500).json({ error: "An error occurred" });
    }
});

//Get all threads
router.get("/threads", async (req, res) => {
    try{
        const threads = await (await Thread.find()).toSorted({ updatedAt: -1 });
        res.json(threads);
    }catch(error){
        console.log(error);
        res.status(500).json({ error: "Failed to fetch threads" });
    }
});

//Get a specific thread by threadId
router.get("/threads/:threadId", async (req, res) => {
    const { threadId } = req.params;
    try {
        const thread = await Thread.findOne({ threadId });
        if (!thread) {
            return res.status(404).json({ error: "Thread not found" });
        }
        res.json(thread.messages);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch thread" });
    }
});

//Delete a specific thread by threadId
router.delete("/threads/:threadId", async (req, res) => {
    const { threadId } = req.params;
    try {
        const deletedThread = await Thread.findOneAndDelete({ threadId });
        if (!deletedThread) {
            return res.status(404).json({ error: "Thread not found" });
        }
        res.status(200).json({ success: "Thread deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to delete thread" });
    }
});

//Add a message to a specific thread
router.post("/chat", async (req, res) => {
    const { threadId, message } = req.body;
    if(!threadId || !message) {
        return res.status(400).json({ error: "Thread ID and message are required" });
    }
    try {
        const thread = await Thread.findOne({ threadId });
        if (!thread) {
            thread = new Thread ({
                threadId,
                title: message,
                messages: [{role: "user", content: message}]
            });
        }else{
            thread.messages.push({role: "user", content: message});
        }
        const assistantReply = await getOpenRouterAPIResponse(message);
        thread.messages.push({role: "assistant", content: assistantReply});
        thread.updatedAt = new Date();
        await thread.save();
        res.json({ reply: assistantReply });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to add message" });
    }
});

export default router;


