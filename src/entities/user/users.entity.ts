import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseEntity } from '@nosleepfullbuild/uniride-library/dist/entity/base.entity';
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column({ length: 255 })
  password: string;
}
