import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { Restros } from './restros/restro.entity';
import { restrosData } from './data/restroData';
import { usersData } from './data/userData';
import { User } from './user/user.entity';

// npx ts-node src/seed
async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  // application logic...

  for (let i = 0; i < restrosData.length; i++) {
    let restaurant = new Restros();
    restaurant.name = restrosData[i].name;
    restaurant.img = restrosData[i].img;
    restaurant.location = restrosData[i].location;
    restaurant.rating = restrosData[i].avgRating;
    await restaurant.save();
  }

  for (let i = 0; i < usersData.length; i++) {
    let user = new User();
    user.name = usersData[i].name;
    user.email = usersData[i].email;
    user.password = usersData[i].password;
    await user.save();
  }

  //   const adminUser = new UserEntity();
  //   adminUser.name = 'Admin';
  //   adminUser.email = 'admin@gmail.com';
  //   adminUser.password = 'admin1';
  //   adminUser.isAdmin = true;
  //   await adminUser.save();

  //   for (let i = 1; i < 100; i++) {
  //     const review = new ReviewEntity();
  //     review.rating = _.random(1, 5, false);
  //     review.comment = `Review at ${i}`;
  //     review.userId = adminUser.id;
  //     review.restaurantId = _.random(1, 24, false);
  //     const randomDay = _.random(0, 10, false);
  //     review.dateOfVisit = moment()
  //       .subtract(randomDay, 'day')
  //       .format('YYYY-MM-DD');
  //     await review.save();
  //   }
}
bootstrap();
