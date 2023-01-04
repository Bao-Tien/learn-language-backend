import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Folder } from './Folder'

// Client (React) -- APIG -- Lambda (backend) -- typeorm -- Database
@Entity('user') // Table name
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text' })
  username: string

  @Column({ type: 'text' })
  password: string

  @Column({ type: 'text', nullable: true })
  firstName: string

  @Column({ type: 'text', nullable: true })
  lastName: string

  //
  @OneToMany(() => Folder, (folder) => folder.User)
  Folders: Folder[]
}
