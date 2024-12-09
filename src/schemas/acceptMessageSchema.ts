import { z } from "zod";

export const AcceptMessageSchema = z.object({
  acceptmessages: z.boolean(),
});
