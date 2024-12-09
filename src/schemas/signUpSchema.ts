import { z } from "zod";

export const userNameValidation = z
  .string()
  .min(2, "Username Must be Atleast 2 characterss")
  .max(20, "Username Must be no more than 20 characterss")
  .regex(/^[a-zA-Z0-9]+$/, "Username must not contain special characters");

console.log(userNameValidation);

export const signUpSchema = z.object({
  userName: userNameValidation,
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});
