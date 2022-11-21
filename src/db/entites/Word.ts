import { Folder } from "./Folder";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("word") // Table name
export class Word extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  front: string;

  @Column({ type: "text" })
  back: string;

  @Column({ type: "int" })
  folderId: string;

  @ManyToOne(() => Folder, (folder) => folder.words)
  @JoinColumn({ name: "folderId" })
  folder: Folder;
}
