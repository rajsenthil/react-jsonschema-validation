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
  const [formOptions, setFormOptions] = useState()
  
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
  const { buildYup } = require('schema-to-yup')
  useEffect(() => {
    const res = fetch(`/product-schema`)
      .then((data: any) => {
        console.log(data)
        setSchema(data)
        // const ySchema = buildYup(schema, config)
        // setYupSchema(ySchema)
        const validationSchema = Yup.object().shape(data)
        const formOptions = { resolver: yupResolver(validationSchema) }
        // get functions to build form with useForm() hook
        const { register, handleSubmit, reset, formState } = useForm(formOptions)
        const { errors } = formState
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  
  

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='form-row'>
            <div className='form-group col'>
              <label>Title</label>
              <select
                name='title'
                {...register('title')}
                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
              >
                <option value=''></option>
                <option value='Mr'>Mr</option>
                <option value='Mrs'>Mrs</option>
                <option value='Miss'>Miss</option>
                <option value='Ms'>Ms</option>
              </select>
              <div className='invalid-feedback'>{errors.title?.message}</div>
            </div>
            <div className='form-group col-5'>
              <label>First Name</label>
              <input
                name='firstName'
                type='text'
                {...register('firstName')}
                className={`form-control ${
                  errors.firstName ? 'is-invalid' : ''
                }`}
              />
              <div className='invalid-feedback'>
                {errors.firstName?.message}
              </div>
            </div>
            <div className='form-group col-5'>
              <label>Last Name</label>
              <input
                name='lastName'
                type='text'
                {...register('lastName')}
                className={`form-control ${
                  errors.lastName ? 'is-invalid' : ''
                }`}
              />
              <div className='invalid-feedback'>{errors.lastName?.message}</div>
            </div>
          </div>
          <div className='form-row'>
            <div className='form-group col'>
              <label>Date of Birth</label>
              <input
                name='dob'
                type='date'
                {...register('dob')}
                className={`form-control ${errors.dob ? 'is-invalid' : ''}`}
              />
              <div className='invalid-feedback'>{errors.dob?.message}</div>
            </div>
            <div className='form-group col'>
              <label>Email</label>
              <input
                name='email'
                type='text'
                {...register('email')}
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              />
              <div className='invalid-feedback'>{errors.email?.message}</div>
            </div>
          </div>
          <div className='form-row'>
            <div className='form-group col'>
              <label>Password</label>
              <input
                name='password'
                type='password'
                {...register('password')}
                className={`form-control ${
                  errors.password ? 'is-invalid' : ''
                }`}
              />
              <div className='invalid-feedback'>{errors.password?.message}</div>
            </div>
            <div className='form-group col'>
              <label>Confirm Password</label>
              <input
                name='confirmPassword'
                type='password'
                {...register('confirmPassword')}
                className={`form-control ${
                  errors.confirmPassword ? 'is-invalid' : ''
                }`}
              />
              <div className='invalid-feedback'>
                {errors.confirmPassword?.message}
              </div>
            </div>
          </div>
          <div className='form-group form-check'>
            <input
              name='acceptTermsandConditions'
              type='checkbox'
              {...register('acceptTermsandConditions')}
              id='acceptTermsandConditions'
              className={`form-check-input ${
                errors.acceptTermsandConditions ? 'is-invalid' : ''
              }`}
            />
            <label
              htmlFor='acceptTermsandConditions'
              className='form-check-label'
            >
              Accept Terms & Conditions
            </label>
            <div className='invalid-feedback'>
              {errors.acceptTermsandConditions?.message}
            </div>
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-primary mr-1'>
              Register
            </button>
            <button
              type='button'
              onClick={() => reset()}
              className='btn btn-secondary'
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
