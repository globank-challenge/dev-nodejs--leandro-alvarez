import { PrimaryGeneratedColumn, Column, Entity,OneToMany } from 'typeorm';

import { Tribes } from './../../tribes/entities/tribes.entity'

@Entity()
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'int' })
  status: number;

  @OneToMany(() => Tribes, (tribes) => tribes.organization)
  tribes: Tribes[]
}
