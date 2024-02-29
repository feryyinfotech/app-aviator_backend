const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const todoRoutes = require('./routes/todos');
require('dotenv').config();
const conn = require('./config/database');
const { startFly } = require('./controller/Aviator/internalTimeGeneration/internalTimeGeneration');

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200
  }
});

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.use("/api/v1", todoRoutes);

try {
    conn.connect((err) => {
        if (err) {
            console.error("Error connecting to the database:", err);
        } else {
            console.log("Connected to the database");
        }
    });
} catch (e) {
    console.error('Error:', e);
}

// socket.io aviator time generation
function generateAndSendMessage() {
    const time = Math.floor(Math.random() * 20) + 10;
    io.emit("message", time);

    let fly_time = 0;
    let seconds = 0;

    io.emit("setloder", false);
    io.emit("isFlying", true);

    const timerInterval = setInterval(() => {
        let milliseconds = String(fly_time % 1000).padStart(3, "0").substring(0, 2);
        io.emit("seconds", `${milliseconds}_${seconds}`);
        const newTime = fly_time + 1;

        if (newTime >= time * 1000) {
            clearInterval(timerInterval);
            fly_time = 0;
            milliseconds = 0;
            seconds = 0;
            io.emit("seconds", `${milliseconds}_${seconds}`);
        } else if (milliseconds >= 100) {
            seconds += 1;
            milliseconds = 0;
        }

        fly_time = newTime;
    }, 10);

    setTimeout(() => {
        io.emit("isFlying", false);
    }, time * 1000);

    setTimeout(() => {
        clearInterval(timerInterval);
        io.emit("setcolorofdigit", true);
    }, (5 + ((time - 5) / 5 - 0.3) * 5) * 1000);

    setTimeout(() => {
        io.emit("setcolorofdigit", false);
        io.emit("setloder", true);
    }, (time * 1000) + 3000);

    setTimeout(generateAndSendMessage, (time * 1000) + 8000);
}

// color prediction game time generated every 1 min
function generatedTimeEveryAfterEveryOneMin() {
    io.emit("onemin", 1);
    setTimeout(generatedTimeEveryAfterEveryOneMin, 1 * 60 * 1000);
}

// color prediction game time generated every 3 min
function generatedTimeEveryAfterEveryThreeMin() {
    io.emit("threemin", 3);
    setTimeout(generatedTimeEveryAfterEveryThreeMin, 3 * 60 * 1000);
}

// color prediction game time generated every 5 min
function generatedTimeEveryAfterEveryFiveMin() {
    io.emit("fivemin", 5);
    setTimeout(generatedTimeEveryAfterEveryFiveMin, 5 * 60 * 1000);
}

let x = true;
io.on('connection', (socket) => {
    if (x) {
        console.log("Functions called");
        generateAndSendMessage(); // aviator game every random time 
        generatedTimeEveryAfterEveryOneMin(); // color prediction game every 1 time generating time
        generatedTimeEveryAfterEveryThreeMin(); // color prediction game every 3 time generating time
        generatedTimeEveryAfterEveryFiveMin(); // color prediction game every 5 time generating time
        x = false;
    }
});

app.get("/", (req, res) => {
    res.send(`<h1>This is running at ${PORT}</h1>`);
});

httpServer.listen(PORT, () => {
    console.log("Server listening on port", PORT);
});
