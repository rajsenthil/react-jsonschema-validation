import Image from 'next/image'
import { Montserrat } from 'next/font/google'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup';

const montserrat = Montserrat({ subsets: ['latin'] })

export default function Home() {
  const [schema, setSchema] = useState()
  const [yupSchema, setYupSchema] = useState()
  const [formOptions, setFormOptions] = useState<any>()

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
  // const { buildYup } = require('schema-to-yup')
  useEffect(() => {
    const res = fetch(`/product-schema`)
      .then((data: any) => {
        console.log(data)
        setSchema(data)
        // const ySchema = buildYup(schema, config)
        // setYupSchema(ySchema)
        const validationSchema = Yup.object().shape(data)
        const tempOptions = { resolver: yupResolver(validationSchema) }
        setFormOptions(tempOptions)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions)
  const { errors } = formState

  function onSubmit(data: any) {
    // display form data on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4))
    return false
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${montserrat.className}`}
    >
      <div className='text-base lg:text-3xl md:text-lg sm:text-sm'>
        React jsonschema validation
      </div>
      <div>
        <form
  className="w-full max-w-lg m-auto py-10 mt-10 px-10 border"
  onSubmit={handleSubmit(onSubmit)}
>
  <div>
    <label className="text-gray-600 font-medium">Job Title</label>
    <input className="border-solid border-gray-300 border py-2 px-4 w-full
    rounded text-gray-700" name="title" placeholder="Full Stack Developer,
    Backend Engineer, etc." /> {errors.title && (
    <div className="mb-3 text-normal text-red-500 ">{errors.title}</div>
    )}
  </div>

  <button
    className="mt-4 w-full bg-green-400 hover:bg-green-600 text-green-100 border shadow py-3 px-6 font-semibold text-md rounded"
    type="submit"
  >
    Submit
  </button>
</form>
      </div>
    </main>
  )
}
