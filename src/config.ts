import { registerAs } from "@nestjs/config";

export default registerAs('config', () => {
  return {
    cockroachDB: {
      dbName: process.env.COCKROACH_DB,
      port: parseInt(process.env.COCKROACH_PORT, 10),
      password: process.env.COCKROACH_PASSWORD,
      user: process.env.COCKROACH_USER,
      host: process.env.COCKROACH_HOST,
      cluster: process.env.COCKROACH_CLUSTER,
    },
  }
})
