import TherapiesOffered from '@/components/TherapyPage'
import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Therapies Offered',
}
const page = () => {
  return (
    <>
      <TherapiesOffered />
    </>
  )
}

export default page