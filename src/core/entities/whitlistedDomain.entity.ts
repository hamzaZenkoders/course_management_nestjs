import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class whiteListDomain {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  domain: string;
}
