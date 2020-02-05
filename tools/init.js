import k from './key'
import admin from '../model/admin'

const createAdmin = async () => {
  const hashedKey = await k.hash('admin')
  const res = await admin.addAdmin('admin', hashedKey)
  console.log('[INIT] create admin :', res)
}

createAdmin()
