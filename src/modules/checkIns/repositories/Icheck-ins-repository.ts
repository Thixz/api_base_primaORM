import { CheckIn, Prisma } from "@prisma/client";

export interface ICheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>; // Aqui nesse caso se fosse utilizado o CheckInCreateInput ele pediria um User e um Gym que seriam criados também no momento da inserção do dado check-in. Como no caso não queremos isso utilizamos então o CheckInUncheckedCreateInput

  findManyByUserId(user_id: string, page: number): Promise<CheckIn[]>;

  countByUserId(user_id: string): Promise<number>;

  findByUserIdOnDate(user_id: string, date: Date): Promise<CheckIn | null>;
}
