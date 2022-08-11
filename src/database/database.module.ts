import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, dbName, password, port, cluster } = configService.cockroachDB;
        return {
          type: "cockroachdb",
          url: `postgresql://${user}:${password}@${host}:${port}/${dbName}?sslmode=verify-full`,
          ssl: true,
          extra: {
            options: `--cluster=${cluster}`,
          },
          synchronize: true,
          autoLoadEntities: true,
        };
      },
    }),
  ],
  providers: [],
  exports: [TypeOrmModule],
})
export class DatabaseModule { }
