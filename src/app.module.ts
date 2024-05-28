import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';

// cache
import { CacheModule } from '@nestjs/cache-manager';

// schedule
import { ScheduleModule } from '@nestjs/schedule';

// bull
// import { BullModule } from '@nestjs/bull';

// @Module({
//   imports: [
//     BullModule.forRoot({
//       redis: {
//         host: 'localhost',
//         port: 6379,
//       },
//     }),
//   ],
// })

// event-emitter
import { EventEmitterModule } from '@nestjs/event-emitter';

// import { SequelizeModule } from '@nestjs/sequelize';

// @Module({
//   imports: [
//     SequelizeModule.forRoot({
//       dialect: 'mysql',
//       host: 'localhost',
//       port: 3306,
//       username: 'root',
//       password: 'root',
//       database: 'test',
//       models: [],
//     }),
//   ],
// })

// ThrottlerModule
// import { ThrottlerModule } from '@nestjs/throttler';

// @Module({
//   imports: [
//     ThrottlerModule.forRoot([
//       {
//         ttl: 60000,
//         limit: 10,
//       },
//     ]),
//   ],
// })

// static
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
  imports: [
    ArticleModule,
    CacheModule.register(),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/article');
  }
}
