'use strict'

import { Sequelize, DataTypes } from 'sequelize'
import config from '../config/config.json'
import { DB } from '../types/db.types'
import * as fs from 'fs'
import * as path from 'path'
import * as process from 'process'

const basename = path.basename(process.argv[1])
const env = process.env.NODE_ENV || 'development'
const dbConfig = config[env as keyof typeof config]

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: 'mysql',
    port: dbConfig.port,
  }
)

const db: DB = {
  sequelize,
  Sequelize,
  // Your models will be added here
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    )
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    )
    db[model.name] = model
  })

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

export default db
