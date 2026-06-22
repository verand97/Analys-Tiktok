import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    // Di skenario nyata, verifikasi signature dari Midtrans di sini
    // const serverKey = process.env.MIDTRANS_SERVER_KEY;
    // const signatureKey = payload.signature_key;
    // ...

    const { order_id, transaction_status } = payload;

    console.log(`[Midtrans Webhook] Menerima event dari order: ${order_id}, Status: ${transaction_status}`);

    if (transaction_status === 'settlement' || transaction_status === 'capture') {
       // TODO: Update tabel User di Database (set role = 'pro', perpanjang subscription_expires_at)
       console.log(`[Midtrans Webhook] Mengubah status user menjadi PRO untuk order ${order_id}`);
    } else if (transaction_status === 'expire' || transaction_status === 'cancel') {
       // TODO: Batalkan subscription jika gagal dibayar
    }

    return NextResponse.json({ status: 'success', message: 'Webhook processed' });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
