import ReservationComp from "@/src/components/Reservation/ReservationComp"
import Image from "next/image"

const page = () => {
  return (
    <section className='h-screen'>
      <main className='relative h-full w-full'>
        <div className='relative h-full w-full'>
          <Image
            className='img'
            src='/assets/BEACHbg.jpg'
            alt='cover'
            width={1000}
            height={1000}
            priority
            loading='eager'
          />

          {/* Overlay */}
          <div className='absolute inset-0 z-10 bg-black/70'></div>

          {/* Text */}
          <div className='absolute top-1/2 left-1/2 z-20 w-full -translate-x-1/2 -translate-y-1/2'>
            <h1 className='text-center text-3xl font-bold mb-8'>Reserve Your Spot</h1>
            <ReservationComp />
          </div>
        </div>
      </main>
    </section>
  )
}

export default page