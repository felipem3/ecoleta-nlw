import knex from 'knex'
//biblioteca para padronização de caminho
import path from 'path'

const connection = knex({
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname,'database.sqlite')
  },
  useNullAsDefault: true
})

export default connection