import express from 'express'
import connectDatabase from './db.js'
import authRoutes from './router/auth.route.js';
import todoRoutes from './router/Todos.route.js'
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(cors())

app.listen(3000,() =>{
    console.log('server is running at 3000');
})

connectDatabase();

app.use('/api/auth',authRoutes);
app.use('/api/todos',todoRoutes)
