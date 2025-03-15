const express = require("express");
const app = express();
const port = 3001;
const config = require('./config/config');
const userRouter = require('./routes/userRoute');

config(app);

app.use('/', userRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});