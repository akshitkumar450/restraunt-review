import { Review } from 'src/reviews/review.entity';
import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  BaseEntity,
  OneToMany,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isAdmin: boolean;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}
