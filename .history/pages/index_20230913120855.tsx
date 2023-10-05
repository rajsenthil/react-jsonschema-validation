import Image from 'next/image'
import { Montserrat } from 'next/font/google'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import Datepicker from 'react-tailwindcss-datepicker'

const montserrat = Montserrat({ subsets: ['latin'] })

export default function Home() {
  const [schema, setSchema] = useState()
  const [yupSchema, setYupSchema] = useState()
  const [formOptions, setFormOptions] = useState<any>()
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  })

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

  const handleValueChange = (newValue: any) => {
    console.log('newValue:', newValue)
    setValue(newValue)
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${montserrat.className}`}
    >
      <div className='text-base lg:text-3xl md:text-lg sm:text-sm'>
        React jsonschema validation
      </div>
      <div className='w-full max-w-lg'>
        <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              ID
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='id'
              type='text'
              placeholder='Id'
            />
            <p className='text-red-500 text-xs italic'>Input a number</p>
          </div>
          <div className='mb-6'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              productType
            </label>
            <select
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
              id='productType'
            >
              <option value='Simple'>Simple</option>
              <option value='Configurable'>Configurable</option>
              <option value='Grouped'>Grouped</option>
              <option value='Virtual'>Virtual</option>
              <option value='Bundle'>Bundle</option>
            </select>
            <p className='text-red-500 text-xs italic'>
              Please choose a product type.
            </p>
          </div>
          <div className='mb-6'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Product Date
            </label>
            {/* <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
              id='productDate'
            /> */}
            <Datepicker
              value={value}
              onChange={handleValueChange}
              useRange={false}
              asSingle={true}
            />
            <p className='text-red-500 text-xs italic'>
              Product Date Input a valid json date-time format.
            </p>
          </div>
          <div className='mb-6'>
            <label className='block text-gray-700 text-lg font-bold mb-2'>
              Product Price Section
            </label>
            {/* <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
              id='productPrice'
            />
            <p className='text-red-500 text-xs italic'>
              Product Price.
            </p> */}
            <div className='border-solid border-2 border-gray-600 hover:border-dotted'>
              <div className='mb-6'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>
                  Regular Price
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                  id='regularPrice'
                />
                <p className='text-red-500 text-xs italic'>Regular Price.</p>
              </div>
              <div className='mb-6'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>
                  Market Price
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                  id='marketPrice'
                />
                <p className='text-red-500 text-xs italic'>Market Price.</p>
              </div>
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              type='button'
            >
              Validate
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
