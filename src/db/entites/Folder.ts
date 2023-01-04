import { Word } from './Word'
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User'

@Entity('folder') // Table name
export class Folder extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text' })
  name: string

  @Column({ type: 'int' })
  userId: number

  // Relations
  @OneToMany(() => Word, (word) => word.Folder)
  words: Word[]

  @ManyToOne(() => User, (user) => user.Folders, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  User: User
}
