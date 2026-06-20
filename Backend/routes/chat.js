import express from "express";
import Thread from "../models/Thread.js";

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

export default router;
