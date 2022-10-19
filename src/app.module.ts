import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost' || process.env.PGHOST,
      port: 5432 || +process.env.PGPORT,
      username: 'postgres' || process.env.PGUSER,
      password: 'root' || process.env.PGPASSWORD,
      database: 'Annonymous Message Application' || process.env.PGDATABASE,
      autoLoadEntities: true,
      synchronize: true,
      dropSchema: false
    }),
    UserModule,
    MessageModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
