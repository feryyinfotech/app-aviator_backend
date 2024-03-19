const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const todoRoutes = require("./routes/todos");
require("dotenv").config();
const conn = require("./config/database");
//  
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
  },
});

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.use("/api/v1", todoRoutes);
// dsfsdf
try {
  conn.connect((err) => {
    if (err) {
      console.error("Error connecting to the database:", err);
    } else {
      console.log("Connected to the database");
    }
  });
} catch (e) {
  console.error("Error:", e);
}

function generateAndSendMessage() {
  const time = Math.floor(Math.random() * 50) + 10;
  io.emit("message", time);

  let fly_time = 0;
  let milliseconds = 0;
  let seconds = 0;

  io.emit("setloder", false);
  io.emit("isFlying", true);

  const timerInterval = setInterval(() => {
    if (milliseconds === 100) {
      seconds += 1;
      milliseconds = 0;
    }

    io.emit("seconds", `${String(milliseconds).padStart(2, "0")}_${seconds}`);
    const newTime = fly_time + 1;

    if (newTime >= time * 1000) {
      clearInterval(timerInterval);
      fly_time = 0;
      milliseconds = 0;
      seconds = 0;
    }

    milliseconds += 1;
    fly_time = newTime;
  }, 100);

  setTimeout(() => {
    io.emit("isFlying", false);
    clearInterval(timerInterval);
  }, time * 1000);

  setTimeout(() => {
    clearInterval(timerInterval);
    io.emit("setcolorofdigit", true);
  }, (5 + ((time - 5) / 5 - 0.3) * 5) * 1000);

  setTimeout(() => {
    io.emit("setcolorofdigit", false);
    io.emit("setloder", true);
  }, time * 1000 + 3000);

  setTimeout(generateAndSendMessage, time * 1000 + 8000);
}

// color prediction game time generated every 1 min
function generatedTimeEveryAfterEveryOneMin() {
  let seconds = 59;
  const interval = setInterval(() => {
    io.emit("onemin", seconds);
    // console.log("time",seconds);
    seconds--;
    if (seconds < 0) {
      seconds = 59;
      clearInterval(interval)
      generatedTimeEveryAfterEveryOneMin();
      
    }
  }, 1000);
}

// color prediction game time generated every 3 min
const generatedTimeEveryAfterEveryThreeMin = () => {
  let min = 2;
  let sec = 59;

  const interval = setInterval(() => {
    io.emit("threemin", `${min}_${sec}`);
    console.log("Threemin",min,sec)
    sec--;

    if (sec < 0) {
      sec = 59;
      min--;

      if (min < 0) {
        sec = 59;
        min = 2;
        clearInterval(interval);
        generatedTimeEveryAfterEveryThreeMin();
      }
    }
  }, 1000);
};



const generatedTimeEveryAfterEveryFiveMin = () => {
    let min = 4;
    let sec = 59;
  
    const interval = setInterval(() => {
      io.emit("fivemin", `${min}_${sec}`);

      sec--;
  
      if (sec < 0) {
        sec = 59;
        min--;
  
        if (min < 0) {
          sec = 59;
          min = 4;
          clearInterval(interval);
          generatedTimeEveryAfterEveryFiveMin();
        }
      }
    }, 1000);
  };

let x = true;
io.on("connection", (socket) => {
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
  res.send(`<h1>Server is running at ${PORT}</h1>`);
});

httpServer.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});
