import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from './common/logger/logger.middleware';
import * as Mongoose from 'mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // env 불러오기
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      //디비 연결하기 및 설정하기
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    CatsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  private readonly isDev: boolean = process.env.MODE === 'dev' ? true : false;

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    Mongoose.set('debug', this.isDev);
  }
}
