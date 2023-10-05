import Image from 'next/image'
import { Montserrat } from 'next/font/google'
import { useEffect, useState } from 'react'
import Datepicker from 'react-tailwindcss-datepicker'

/**json schema imports */
import { addSchema, validate } from '@hyperjump/json-schema/draft-2020-12'


const montserrat = Montserrat({ subsets: ['latin'] })

export default function Home() {
  const defProduct: Product = {
    id: 0,
    product_date: new Date(),
    productType: '',
    tags: {},
    productPrice: {
      markedPrice: 4.0,
      regularPrice: 3.0,
    },
  }

  const [product, setProduct] = useState<Product>(defProduct)
  const [schema, setSchema] = useState()
  const [validate, setValidate] = useState<any>()
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
      .then((response) => response.json())
      .then((data: any) => {
        console.log('Data: ', data)
        setSchema(data)
        console.log('Parsing the schema', data)
        addSchema(JSON.parse(data), 'https://json-schema.hyperjump.io/schema')
        console.log('Creating the compiler')
        const newValidate = validate('https://json-schema.hyperjump.io/schema')
        console.log('Compiling the schema...')
        setValidate(newValidate)
        console.log('Compiled.')        
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])


  function onSubmit() {
    // display form data on success
    console.log('Before checking validator...')
    if (!validate) {
      console.log("Validate is not initialized")
      return
    }
    const valid = validate(product)
    if (!valid) console.log(validate.errors)
    return false
  }

  const handleValueChange = (newValue: any) => {
    console.log('newValue:', newValue)
    console.log('start date:', newValue.startDate)
    let dt = new Date(newValue.startDate)
    console.log('start date formatted:', dt)
    setProduct({ ...product, product_date: dt })
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
        <form
          className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
          onSubmit={onSubmit}
        >
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              ID
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='id'
              type='text'
              placeholder='Id'
              value={product?.id}
              onChange={(e) =>
                setProduct({ ...product, id: Number(e.target.value) })
              }
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
              onChange={(e) => {
                console.log('Product Type value: ', e.target.value)
                setProduct({ ...product, productType: e.target.value })
              }}
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
              Price details
            </label>
            <div className='border-dotted border-2 border-gray-600 hover:border-solid p-6'>
              <div className='mb-6'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>
                  Regular Price
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                  id='regularPrice'
                  value={product.productPrice.regularPrice}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      productPrice: {
                        ...product.productPrice,
                        regularPrice: Number(e.target.value),
                      },
                    })
                  }
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
                  value={product.productPrice.markedPrice}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      productPrice: {
                        ...product.productPrice,
                        markedPrice: Number(e.target.value),
                      },
                    })
                  }
                />
                <p className='text-red-500 text-xs italic'>Market Price.</p>
              </div>
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              type='submit'
            >
              Validate
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
