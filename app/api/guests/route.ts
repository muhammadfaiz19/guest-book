// app/api/guests/route.ts
import { createClient } from '@/lib/supabase/server'; 
import { NextResponse } from 'next/server';
import { guestBookSchema } from '@/lib/validators/guestbook-validator';

export async function POST(request: Request) {
  const supabase = await createClient();
  const body = await request.json();

  const validation = guestBookSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json({ error: "Data tidak valid", details: validation.error.format() }, { status: 400 });
  }

  const { fullName, address, phone, purpose, visitDate } = validation.data;
    
  const { error } = await supabase
    .from('guests')
    .insert({
      full_name: fullName,
      address,
      phone,
      purpose,
      visit_date: visitDate,
    });

  if (error) {
    console.error('Supabase insert error:', error); 
    return NextResponse.json({ error: "Gagal menyimpan data", details: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Data berhasil disimpan" });
}
