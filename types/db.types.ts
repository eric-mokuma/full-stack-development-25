import { Sequelize } from 'sequelize'

export interface DB {
  sequelize: Sequelize
  Sequelize: typeof Sequelize
  [key: string]: any // This allows for dynamic model properties
}
