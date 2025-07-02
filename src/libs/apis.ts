import { Reservation } from '../models/reservation'
import { Review, ReviewCardItem } from '../models/review'
import sanityClient from './sanity'
import * as queries from './sanityQueries'

export async function getUserData(userId: string) {
  const result = await sanityClient.fetch(
    queries.getUserDataQuery,
    { userId },
    { cache: 'no-cache' }
  )

  return result
}

export async function getApprovedReviewsQuery(): Promise<ReviewCardItem[]> {
  const reviews = await sanityClient.fetch(queries.getApprovedReviewsQuery, {})

  return reviews.map((review: Review) => ({
    quote: review.message,
    name: review.name,
    rating: review.rating
  }))
}

export async function createReservation(
  data: Reservation & { userId: string }
) {
  const doc = {
    _type: 'reservation',
    user: { _type: 'reference', _ref: data.userId },
    name: data.name,
    email: data.email,
    phone: data.phone,
    nationality: data.nationality,
    date: data.date,
    numberOfPeople: data.numberOfPeople,
    status: 'pending',
    createdAt: new Date().toISOString()
  }

  const result = await sanityClient.create(doc)
  return result
}
