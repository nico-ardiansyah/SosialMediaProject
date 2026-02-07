const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { rateLimit, ipKeyGenerator } = require("express-rate-limit");
const helmet = require("helmet");
const speedLimit = require("express-slow-down");
const mongoSanitize = require("express-mongo-sanitize");
const jwt = require("jsonwebtoken");

app.use(cors({
    origin: process.env.CORS_SERVER,
    credentials : true
}));

// app.use(mongoSanitize({
//     replaceWith: "_"
// }));

app.set("trust proxy", 1);

app.use(express.json({limit : "2mb"}));
app.use(cookieParser());
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));


app.use(rateLimit({
    windowMs: 1 * 60 * 1000, 
    max: 100, 
    message: { message: "Too many requests, please try again later." },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => ipKeyGenerator,
}));

app.use(speedLimit({
    windowMs: 1 * 60 * 1000,
    delayAfter: 50,
    delayMs : () => 1000
}));

// Google Drive Config
const googleDriveConfig = require("./src/Services/GoogleDriveConfig/googleDriveConfig");

// router
const auth = require("./src/routes/AuthRoutes/AuthRouter/Auth");
const post = require("./src/routes/PostRoutes/PostRouter/Post");
const userAction = require("./src/routes/UserAction/UserActionRouter/UserAction");

// port
const port = process.env.PORT || 3000;

// connect to DB
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('DB Connection Success'))
    .catch((e) => console.error("❌ DB Connection Error:", e))


// endpoint get image post
app.get("/proxy-image/:fileId", async (req, res) => {
    try {
        const { fileId } = req.params;

        // Ambil metadata dulu (buat dapat mimetype)
        const fileMeta = await googleDriveConfig.files.get({
            fileId,
            fields: "mimeType, name",
        });

        if (!fileMeta) return res.status(404).send("File not found");

        // Ambil isi file (stream)
        const fileStream = await googleDriveConfig.files.get(
            { fileId, alt: "media" },
            { responseType: "stream" }
        );

        // Set header agar bisa dibaca di <img>
        res.setHeader("Content-Type", fileMeta.data.mimeType);
        res.setHeader("Cache-Control", "public, max-age=31536000"); // cache 1 tahun

        // Pipe langsung ke response
        fileStream.data.pipe(res);
    } catch (err) {
        console.error("Error load image:", err.message);
        res.status(500).send("Failed to load image");
    }
});



// routes
app.get('/', async (req, res) => {
    res.send("Hello World");
});


app.use("/api/v1", auth);
app.use("/api/v1", post);
app.use("/api/v1", userAction);

// Global error handler
app.use((err, req, res, next) => {
    console.error("Unhandled Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
});

app.listen(port, () => { 
    console.log(`Server running at: http://localhost:${port}`)
});