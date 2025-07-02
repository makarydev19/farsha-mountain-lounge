export type Reservation = {
  _id?: string
  name: string
  email: string
  phone: string
  nationality: string
  date: string // ISO format
  numberOfPeople: number
  status?: 'pending' | 'confirmed' | 'rejected'
}
