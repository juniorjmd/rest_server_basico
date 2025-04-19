import express from 'express';
import cors from 'cors';
import userRoutes from './../routes/user.js';
export  class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8080;
        this.userPath = '/api/user';
        // Middlewares
        this.middlewares();
        //lectura del body
        this.app.use(express.json());
        // Routes
        this.routes();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.static('public')); 
    }

    routes() {
        this.app.use(this.userPath,userRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}

 