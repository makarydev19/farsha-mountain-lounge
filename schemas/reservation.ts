import { defineField, defineType } from 'sanity'

const reservation = defineType({
  name: 'reservation',
  title: 'Reservation',
  type: 'document',
  fields: [
    defineField({
      name: 'user',
      title: 'User',
      type: 'reference',
      to: [{ type: 'user' }],
      readOnly: true
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      readOnly: true,
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      readOnly: true,
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'nationality',
      title: 'Nationality',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'date',
      title: 'Reservation Date',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD' // ✅ only this is valid
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'time',
      title: 'Reservation Time',
      type: 'string',
      options: {
        list: ['09:00', '12:00', '15:00'], // ✅ Limit to predefined values
        layout: 'radio' // or 'dropdown'
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'numberOfPeople',
      title: 'Number of People',
      type: 'number',
      validation: Rule => Rule.required().min(1)
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: ['pending', 'confirmed', 'rejected'],
        layout: 'radio'
      },
      initialValue: 'pending',
      readOnly: true
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true
    })
  ]
})

export default reservation
