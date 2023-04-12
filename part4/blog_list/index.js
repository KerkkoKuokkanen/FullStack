
const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const logger = require('./utils/logger')
const config = require('./utils/config')
const mongoose = require('mongoose')

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
