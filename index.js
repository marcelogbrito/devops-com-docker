const express = require('express')
const mongoose = require('mongoose')
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, REDIS_PORT, SESSION_SECRET} = require('./config/config')
const session = require('express-session')
const redis = require('redis')
let redisStore = require('connect-redis')(session)
let redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT,
})

const postRouter = require('./routes/postRoutes')
const userRouter = require('./routes/userRoutes')

const app = express()

const mongoUrl= `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`

const connectWithRetry = () => {
  mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("conectado ao banco de dados"))
  .catch((e) => {
    console.log(e)
    setTimeout(connectWithRetry, 5000)
  })
}

connectWithRetry()

app.enable("trust proxy")
app.use(cors({

}))
app.use(session({
  store: new redisStore({
    client: redisClient
  }),
  secret: SESSION_SECRET,
  cookie: {
    secure: false,
    resave: false,
    saveUninitialized: false,
    httpOnly: true,
    maxAge: 30000
  }
}))

app.use(express.json())

app.get("/api/v1",(req,res) => {
  res.send(`<h2>Olá!! porta ${port} rodando ...</h2>`)
  console.log("...rodando")
})

//localhost:3000/api/v1/posts
app.use("/api/v1/posts", postRouter)
app.use("/api/v1/users", userRouter)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`escutando na porta ${port}`))
