import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleware } from './app.middleware';
import { AuthModule } from './auth/auth.module';
import keys from './config/keys';
import { JwtModule, JwtService } from "@nestjs/jwt";
import { jwtConstants } from "src/config/constants";

@Module({
  imports: [
    MongooseModule.forRoot(keys.mongoURI),
    AuthModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '1y',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      {
        path: 'auth/signin',
        method: RequestMethod.GET,
      },
      {
        path: 'auth/signin',
        method: RequestMethod.GET,
      },
      {
        path: '',
        method: RequestMethod.GET,
      },
    );
  }
}
