import express from 'express';
import db from '../dbConfig';

let masterRouter = express.Router();

masterRouter.route('/create').get(async (req, res) => {
    try{
        await db.sync({force : true})    
        res.status(201).json({message : 'created'})
    }
    catch(err){
        console.warn(err)
        res.status(500).json({message : 'server error'})
    }
});

export default masterRouter;