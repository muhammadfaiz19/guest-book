// File: app/api/guests/[id]/route.ts

import { createClient } from '@/lib/supabase/server';
import { guestBookSchema } from '@/lib/validators/guestbook-validator';
import { NextResponse } from 'next/server';

// ✅ GET
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient();
  const { id } = params;

  const { data, error } = await supabase
    .from('guests')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    return NextResponse.json(
      { error: 'Data tidak ditemukan', details: error.message },
      { status: 404 }
    );
  }

  return NextResponse.json(data);
}

// ✅ PUT
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient();
  const { id } = params;

  try {
    const body = await request.json();
    const validation = guestBookSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Data tidak valid', details: validation.error.format() },
        { status: 400 }
      );
    }

    const { fullName, address, phone, purpose, visitDate } = validation.data;

    const { data, error } = await supabase
      .from('guests')
      .update({
        full_name: fullName,
        address,
        phone,
        purpose,
        visit_date: visitDate,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: 'Gagal memperbarui data', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }
}

// ✅ DELETE
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient();
  const { id } = params;

  const { error } = await supabase.from('guests').delete().eq('id', id);

  if (error) {
    return NextResponse.json(
      { error: 'Gagal menghapus data', details: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: 'Data berhasil dihapus' });
}
