import { isDev } from './global/env.global'
import { argv } from 'zx-cjs'
export const PORT = 4913
export const API_VERSION = 2

export const CROSS_DOMAIN = {
  allowedOrigins: argv.allowed_origins
  ? argv.allowed_origins?.split?.(',')
  : ['suemor.com', 'localhost', '127.0.0.1', '.*dev','192.168.1.5'],
}

export const MONGO_DB = {
  dbName: 'suemor-blog',
  host: argv.db_host || '127.0.0.1',
  port: 27017,
  get uri() {
    return `mongodb://${this.host}:${this.port}/${this.dbName}`
  },
}

export const REDIS = {
  host: 'localhost',
  port: 6379,
  password: null,
  ttl: null,
  httpCacheTTL: 5,
  max: 5,
  disableApiCache: isDev && !process.env['ENABLE_CACHE_DEBUG'],
}

export const AXIOS_CONFIG = {
  timeout: 10000,
}

export const SECURITY = {
  jwtSecret: 'suemor',
  jwtExpire: '7d',
}
