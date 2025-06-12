import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions"


export const pgConfig: PostgresConnectionOptions = {
    url: "postgresql://neondb_owner:npg_xiedSq1XrMj2@ep-curly-shadow-a8zs2g4x-pooler.eastus2.azure.neon.tech/neondb?sslmode=require",
    type: "postgres",
    port: 5432,
      entities: [__dirname + '/**/*.entity.{ts,js}'],
    synchronize: true,
    
   
}