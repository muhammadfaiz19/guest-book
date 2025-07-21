import { z } from "zod";

export const guestBookSchema = z.object({
  fullName: z.string().min(2, { message: "Nama lengkap minimal 2 karakter." }),
  address: z.string().min(5, { message: "Alamat minimal 5 karakter." }),
  phone: z.string()
    .regex(/^[0-9]*$/, { message: "Nomor HP hanya boleh berisi angka." })
    .min(10, { message: "Nomor HP minimal 10 digit." })
    .max(15, { message: "Nomor HP maksimal 15 digit." })
    .optional()
    .or(z.literal('')), // Memperbolehkan string kosong
  purpose: z.string().min(5, { message: "Tujuan kunjungan minimal 5 karakter." }),
  visitDate: z.string().nonempty({ message: "Tanggal kunjungan wajib diisi." }),
});

export type GuestBookFormData = z.infer<typeof guestBookSchema>;