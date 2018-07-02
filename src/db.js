import { Pool } from 'pg'
export default (queryText, queryValues, cb) => {
  const pool = new Pool()
  pool.on('error', (err, client) => {
    if(err){
      console.log('Error on database connection', err)
      return cb.err = err
    }
  })
  pool.connect((err, client, release) => {
    if(err){
      return cb.err = err
    }
    client.query(queryText, queryValues, (err, result) => {
      release()
      if(err){
        return cb.err = err
      }
      return cb.data = result.rows
    })
  })
}