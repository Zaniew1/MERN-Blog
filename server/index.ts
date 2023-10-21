import * as express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
const app = express();
mongoose.connect(`${process.env.MONGO_DB_PASS}`);

app.use(cors());
app.options('*', cors());
app.use(express.json());

app.get('/', (req, res)=>{
    res.send('test');
});
app.listen(3001, ()=>{
    console.log("Server runs good !")
})