import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host:  process.env.PGHOST || 'localhost',
      port: +process.env.PGPORT || 5432,
      username: process.env.PGUSER || 'postgres',
      password:  process.env.PGPASSWORD || 'root',
      database: process.env.PGDATABASE || 'Annonymous Message Application',
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
