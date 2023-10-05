import Image from 'next/image'
import { Montserrat } from 'next/font/google'
import { useState } from 'react'

const montserrat = Montserrat({ subsets: ['latin'] })

export default function Home() {
  const [schema, setSchema] useState()
  const getSchema = async () => {
    try {
      const res = await fetch(`/product-schema`)
      const data = await res.json()      
      console.log(data)
      setSchema( data)
    } catch (err) {
      console.log(err)
      return err
    }
  }


  
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${montserrat.className}`}
    >
      <div className='text-base lg:text-3xl md:text-lg sm:text-sm'>
        React jsonschema validation
        <div>
          
        </div>
      </div>
    </main>
  )
}
