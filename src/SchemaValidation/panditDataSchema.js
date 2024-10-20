import { z } from "zod";


export const panditSchema = z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    phone: z.string().refine(
      (value) => {
        const sanitizedValue = value.startsWith("0") ? value.slice(1) : value;
        // Check if the remaining part is exactly 10 digits
        return sanitizedValue.length === 10 && /^\d+$/.test(sanitizedValue);
      },
      {
        message:
          "Phone number must be exactly 10 digits and contain only numbers",
      }
    ),
  });
  