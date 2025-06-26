import { z } from "zod";

export const QueryValidator = z.object({
  category: z.string().optional(),
  sort: z.enum(["name", "-name", "likes", "-likes"]).optional(),
  limit: z.number().optional(),
  search: z.string().optional(),
});

export type TQueryValidator = z.infer<typeof QueryValidator>;
