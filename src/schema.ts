import { z } from "zod";

const userSchema = z.object({
  id: z.string().min(3),
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  age: z.coerce.number().int().positive(),
  email: z.string().email(),
});

type User = z.infer<typeof userSchema>;

export { userSchema, type User };
