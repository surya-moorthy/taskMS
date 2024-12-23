import express from 'express';
import { router } from './routes';
const app = express();

app.use(express.json())

app.use('/api/v1',router)
app.listen(3001, ()=>{
    console.log("app is running at the port 3001")
})
