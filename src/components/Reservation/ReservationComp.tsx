'use client'

import { useSession } from 'next-auth/react'
import ReusableForm from '../ui/ReusableForm'
import { Field } from '@/types/types'
import toast from 'react-hot-toast'

export const reservationFields: Field[] = [
    {
        id: 'phone',
        label: 'Phone Number',
        type: 'tel',
        placeholder: 'Enter your phone number',
        required: true
    },
    {
        id: 'nationality',
        label: 'Nationality',
        type: 'text',
        placeholder: 'Enter your nationality',
        required: true
    },
    {
        id: 'date',
        label: 'Reservation Date',
        type: 'date', // ✅ Keep this as native HTML date picker
        required: true
    },
    {
        id: 'time',
        label: 'Reservation Time',
        type: 'select', // ✅ Use select instead of manual input
        required: true,
        options: [
            { value: '09:00', label: '09:00 AM' },
            { value: '12:00', label: '12:00 PM' },
            { value: '15:00', label: '03:00 PM' }
        ]
    },
    {
        id: 'numberOfPeople',
        label: 'Number of People',
        type: 'number',
        placeholder: 'How many people?',
        required: true
    }
]


export default function ReservationComp() {
    const { data: session, status } = useSession()

    if (status === 'loading') return <p>Loading...</p>
    if (!session?.user) return <p>Please sign in to make a reservation.</p>

    const handleSubmit = async (values: Record<string, string>) => {
        if (!session?.user) throw new Error('You must be signed in')

        const combinedDate = new Date(`${values.date}T${values.time}`).toISOString()

        const res = await fetch('/api/reservation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: session.user.id,
                name: session.user.name,
                email: session.user.email,
                phone: values.phone,
                nationality: values.nationality,
                date: combinedDate,
                numberOfPeople: Number(values.numberOfPeople),
            }),
        })

        let data: { error?: string; success?: boolean }
        try {
            data = await res.json()
        } catch {
            toast.error('Invalid JSON response')
            throw new Error('Invalid JSON response')
        }

        if (!res.ok) {
            toast.error(data?.error || 'Reservation failed')
            throw new Error(data?.error || 'Reservation failed')
        }
    }

    return (
        <section className="relative mx-auto w-[90%] self-center lg:w-3/5">
            <ReusableForm
                fields={reservationFields}
                onSubmit={handleSubmit}
                submitText="Book Now"
                successMessage="Reservation submitted!"
                errorMessage="Failed to submit reservation."
                twoPerRow
                glassInput
            />
        </section>
    )
}
