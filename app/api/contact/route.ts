import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Nama, email, dan pesan harus diisi." },
        { status: 400 }
      );
    }

    // Backend logic (e.g. database save or email dispatch)
    return NextResponse.json(
      { success: true, message: "Pesan berhasil diterima!" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Terjadi kesalahan internal pada server." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "online",
    message: "Portfolio Backend API is running smoothly on Vercel Serverless Functions.",
  });
}
