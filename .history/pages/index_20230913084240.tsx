import Image from 'next/image'
import { Montserrat } from 'next/font/google'
import { useEffect, useState } from 'react'

const montserrat = Montserrat({ subsets: ['latin'] })

export default function Home() {
  const [schema, setSchema] = useState()

  useEffect(() => {
    const res = fetch(`/product-schema`)
      .then((data: any) => {
        console.log(data)
        setSchema(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const config = {
    // for error messages...
    errMessages: {
      id: {
        required: 'An ID is required',
      },
      productType: {
        required: 'Product Type is required',
        format:
          'Simple, Configurable, Grouped, Virtual, Bundle are valid values',
      },
      product_date: {
        required: 'Product date is required',
        type: 'Product date must be of date-time format',
        format: 'Product date must be of date-time format',
      },
      productPrice: {
        required: 'Product Price is required',
      },
    },
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${montserrat.className}`}
    >
      <div className='text-base lg:text-3xl md:text-lg sm:text-sm'>
        React jsonschema validation
      </div>
    </main>
  )
}
