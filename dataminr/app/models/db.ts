import mysql from 'mysql2/promise';

function connect() {
  let db;

  async function query(sql, params?) {
    if (!db) {
      console.log(process.env.DB_HOST)
      db = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: process.env.DB_NAME,
      });
    }
  
    const [results, ] = await db.execute(sql, params);
  
    return results
  }
  return query
}

const query = connect()

export default {
  query
}
