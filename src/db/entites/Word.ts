import { Folder } from './Folder'
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity('word') // Table name
export class Word extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text' })
  front: string

  @Column({ type: 'text' })
  back: string

  @Column({ type: 'text' })
  frontImageUrl: string

  @Column({ type: 'text' })
  backImageUrl: string

  @Column({ type: 'int' })
  folderId: number

  // Relations
  @ManyToOne(() => Folder, (folder) => folder.words, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'folderId' })
  Folder: Folder
}
