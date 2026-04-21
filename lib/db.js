import { LowSync, JSONFileSync } from 'lowdb'
import { join } from 'path'
let db
export async function getDB(){
  if(db) return db
  const file = join(process.cwd(), 'data.json')
  const adapter = new JSONFileSync(file)
  db = new LowSync(adapter)
  db.read()
  db.data = db.data || { members: [], donations: [] }
  db.write()
  return db
}
