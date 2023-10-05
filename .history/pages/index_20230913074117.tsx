import Image from 'next/image'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${montserrat.className}`}
    >
      <div className='text-xl lg:text-3xl md:text-lg sm:text-sm'>React form validation using jsonschema</div>

    </main>
  )
}
