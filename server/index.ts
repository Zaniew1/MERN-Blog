import express from 'express';
const app = express();
import cors from 'cors';
import 'dotenv/config';
app.use(cors());






app.get('/', (req, res)=>{
    res.send('test');
});
app.listen(3000)