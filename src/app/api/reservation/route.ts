// src/app/api/reservation/route.ts
import { getServerSession } from 'next-auth'
import sanityClient from '@/src/libs/sanity'
import { NextResponse } from 'next/server'
import { authOptions } from '@/src/libs/auth'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id
    const name = session.user.name
    const email = session.user.email

    const {
      phone,
      nationality,
      date,
      numberOfPeople
    }: {
      phone: string
      nationality: string
      date: string
      numberOfPeople: number
    } = await req.json()

    if (!phone || !nationality || !date || !numberOfPeople) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const reservationDoc = {
      _type: 'reservation',
      user: {
        _type: 'reference',
        _ref: userId
      },
      name,
      email,
      phone,
      nationality,
      date,
      numberOfPeople: Number(numberOfPeople),
      status: 'pending',
      createdAt: new Date().toISOString()
    }

    const result = await sanityClient.create(reservationDoc)

    return NextResponse.json(
      {
        success: true,
        message: 'Reservation created successfully',
        reservation: result
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof Error) {
      console.error('Reservation creation failed:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.error('Unknown error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
