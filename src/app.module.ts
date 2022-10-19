import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL || 'postgres://postgres:root@localhost:5432/anon_message_app',
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
