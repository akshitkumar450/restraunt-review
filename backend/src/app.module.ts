import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RestrosModule } from './restros/restros.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restros } from './restros/restro.entity';
import { User } from './user/user.entity';
import { ReviewsModule } from './reviews/reviews.module';
import { Review } from './reviews/review.entity';

@Module({
  imports: [
    UserModule,
    RestrosModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'sqlite.db',
      entities: [Restros, User, Review],
      synchronize: true,
      // logging: true,
    }),
    ReviewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
