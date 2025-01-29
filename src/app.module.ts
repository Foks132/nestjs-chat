import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MessageModule } from './message/message.module';

@Module({
  imports: [ChatModule, TypeOrmModule.forRootAsync({
    imports: [ConfigModule.forRoot()],
    useFactory: (configService: ConfigService) => ({
      type: "mysql",
      host: configService.get("DATABASE_HOST"),
      port: configService.get("DATABASE_PORT"),
      username: configService.get("DATABASE_USERNAME"),
      password: configService.get("DATABASE_PASSWORD"),
      database: configService.get("DATABASE_NAME"),
      synchronize: true,
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
    }),
    inject: [ConfigService],
  }), MessageModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}
