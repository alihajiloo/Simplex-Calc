import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { GenderType } from '../enum/gender.enum';
import { FieldType } from '../enum/field.enum';

@Entity('User')
class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'varchar', length: 30 })
  public firstName: string;

  @Column({ type: 'varchar', length: 30 })
  public lastName: string;

  @Column({ type: 'int', default: 0 })
  public entrance: number;

  @Column({ type: 'varchar' })
  private password: string;

  @Column({ unique: true, type: 'varchar', length: 11 })
  public mobile: string;

  @Column({ unique: true, type: 'varchar', length: 10 })
  public nationalId: string;

  @Column({ unique: true, type: 'varchar', length: 10 })
  public stuId: string;

  @Column({ type: 'enum', enum: FieldType })
  public field: FieldType;

  @Column({ type: 'enum', enum: GenderType })
  public gender: GenderType;

  @CreateDateColumn({
    type: 'timestamp with time zone',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    nullable: true,
  })
  updatedAt: Date;

  async setPassword(password: string): Promise<void> {
    this.password = await bcrypt.hash(password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }
}

export default User;
