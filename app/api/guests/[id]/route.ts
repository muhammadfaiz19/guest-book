import { createClient } from '@/lib/supabase/server';
import { guestBookSchema } from '@/lib/validators/guestbook-validator';
import { NextRequest, NextResponse } from 'next/server';

type RouteContext = {
  params: {
    id: string;
  };
};

// GET: Mengambil satu data tamu berdasarkan ID
export async function GET(request: NextRequest, context: RouteContext) {
  const { id } = context.params;
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('guests')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    return NextResponse.json({ error: 'Data tidak ditemukan', details: error.message }, { status: 404 });
  }

  return NextResponse.json(data);
}

// PUT: Memperbarui data tamu berdasarkan ID
export async function PUT(request: NextRequest, context: RouteContext) {
  const { id } = context.params;
  const supabase = await createClient();
  const body = await request.json();

  const validation = guestBookSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json({ error: 'Data tidak valid', details: validation.error.format() }, { status: 400 });
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
    return NextResponse.json({ error: 'Gagal memperbarui data', details: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// DELETE: Menghapus data tamu berdasarkan ID
export async function DELETE(request: NextRequest, context: RouteContext) {
  const { id } = context.params;
  const supabase = await createClient();

  const { error } = await supabase
    .from('guests')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: 'Gagal menghapus data', details: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Data berhasil dihapus' });
}
