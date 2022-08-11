import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToMany,
  ManyToOne
} from 'typeorm';

import { Repositories } from './../../repositories/entities/repositories.entity'
import { Organization } from './../../organizations/entities/organizations.entity'

@Entity()
export class Tribes {
  @PrimaryGeneratedColumn()
  id_tribe: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @Column({ type: 'int' })
  status: number;

  @OneToMany(() => Repositories, (repositories) => repositories.tribe)
  repositories: Repositories[]

  @ManyToOne(() => Organization, (organization) => organization.tribes)
  organization: Organization
}
