const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");

const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");
const commentRoutes = require("./routes/commentRoutes");

const loggerMiddleware = require("./middlewares/loggerMiddleware");
const timeMiddleware = require("./middlewares/timeMiddleware");
const errorMiddleware = require("./middlewares/errorMiddleware");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const app = express();
app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is healthy",
    });
});

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100,
});


app.use(helmet());
app.use(compression());
app.use(limiter);
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);
app.use(timeMiddleware);


app.use("/posts", postRoutes);
app.use("/users", userRoutes);
app.use("/comments", commentRoutes);



app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);


app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});



app.use(errorMiddleware);

module.exports = app;
