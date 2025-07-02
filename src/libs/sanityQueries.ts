import { groq } from 'next-sanity'

export const getUserDataQuery = groq`
 *[_type == 'user' && _id == $userId][0] {
    _id,
    name,
    email,
    isAdmin,
    about,
    _createdAt,
    image,
}`

export const getApprovedReviewsQuery = groq`
  *[_type == "review" && approved == true] | order(_createdAt desc) {
    _id,
    name,
    message,
    rating,
    createdAt
  }`
