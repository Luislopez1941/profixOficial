import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const response = await fetch('https://back-proservicios-1.onrender.com/api/general_login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(await req.json()),
    });

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      console.error('Error de API:', data); // Log de error si no es ok
      return NextResponse.json({ error: data.message }, { status: response.status });
    }

    // Asegúrate de que la estructura sea la correcta
    const dataCookies = {
      id: data.data?._id,
      name: data.data?.firstName || '', // Asegúrate de manejar el caso en que no exista
      email: data.data?.email || '',
      typeUser: data.data?.typeUser || '',
      token: data.token,
    };

    const serializedData = JSON.stringify(dataCookies);
    const res = NextResponse.json(data, { status: 200 });
    res.cookies.set('user', serializedData, { httpOnly: false, path: '/' });

    return res;
  } catch (error) {
    console.error('Error in POST handler:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
