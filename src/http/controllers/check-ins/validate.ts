import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { makeValidateCheckInUseCase } from "../../../modules/checkIns/use-cases/factories/make-validate-check-in-use-case";

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  });

  const { checkInId } = createCheckInParamsSchema.parse(request.params);

  const validateCheckInUseCase = makeValidateCheckInUseCase();

  await validateCheckInUseCase.execute({
    checkIn_id: checkInId,
  });

  return reply.status(200).send();
}
