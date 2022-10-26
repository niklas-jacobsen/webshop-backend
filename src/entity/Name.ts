import { Column } from "typeorm";

export class Name {
  @Column({
    type: "varchar",
    length: 100,
  })
  first: string;

  @Column({
    type: "varchar",
    length: 100,
  })
  last: string;
}
