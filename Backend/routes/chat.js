import express from "express";
import Thread from "../models/Thread";

const router = express.Router();

//Test route
router.post("/test", async (req, res) => {
    try{
        const thread = new Thread({
            threadId: "12345",
            messages: [
                {
                    role: "user",
                    content: "Hello, how are you?"
                },
                {
                    role: "assistant",
                    content: "I'm good, thank you! How can I assist you today?"
                }
            ]
        });
        await thread.save();
        res.status(201).json({ message: "Thread created successfully", thread });
    }catch(error){
        console.log(error);
        res.status(500).json({ error: "An error occurred" });
    }
});
