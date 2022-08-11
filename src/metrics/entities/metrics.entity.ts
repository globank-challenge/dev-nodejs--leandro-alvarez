import { Column, Entity,PrimaryColumn } from 'typeorm';


@Entity()
export class Metrics {
  @PrimaryColumn()
  id_repository: number;

  @Column({type: "decimal", precision: 2, default: 0})
  coverage: number

  @Column({ type: 'int' })
  bugs: number;

  @Column({ type: 'int' })
  vulnerabilities: number;

  @Column({ type: 'int' })
  hostpot: number;

  @Column({ type: 'int' })
  code_smells: number;

}
