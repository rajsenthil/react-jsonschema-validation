import Image from 'next/image'
import { Montserrat } from 'next/font/google'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

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
      <div className='w-full max-w-xs'>
        <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
          <div className='mb-4'>
            /**
            {
  "id": 0,
  "productType": "Simple",  
  "product_date": "2006-01-02T15:04:05Z",
  "productPrice": {
    "regularPrice": 0.0,
    "markedPrice": 0.0
  },
  "tags": {}  
}
             */
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              ID
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='id'
              type='text'
              placeholder='Id'
            />
          </div>
          <div className='mb-6'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              productType
            </label>
            <select
              className='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
              id='productType'                            
            >
                <option value="Simple">Simple</option>
                <option value="Configurable">Configurable</option>
                <option value="Grouped">Grouped</option>
                <option value="Virtual">Virtual</option>
                <option value="Bundle">Bundle</option>
              </select>
            <p className='text-red-500 text-xs italic'>
              Please choose a password.
            </p>
          </div>
          <div className='flex items-center justify-between'>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              type='button'
            >
              Sign In
            </button>
            <a
              className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'
              href='#'
            >
              Forgot Password?
            </a>
          </div>
        </form>        
      </div>
    </main>
  )
}
