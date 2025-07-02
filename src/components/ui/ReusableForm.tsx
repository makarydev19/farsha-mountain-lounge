'use client'

import { Field } from '@/types/types'
import { useState } from 'react'
import toast from 'react-hot-toast'
import StarRating from './StarRating'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

type ReusableFormProps = {
  fields: Field[]
  onSubmit: (values: Record<string, string>) => Promise<void>
  submitText?: string
  successMessage?: string
  errorMessage?: string
  className?: string
  twoPerRow?: boolean
  glassInput?: boolean
}

const ReusableForm = ({
  fields,
  onSubmit,
  glassInput,
  twoPerRow,
  submitText = 'Submit',
  successMessage = 'Message sent successfully!',
  errorMessage = 'Something went wrong.',
  className
}: ReusableFormProps) => {
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(fields.map(field => [field.id, '']))
  )
  const [loading, setLoading] = useState(false)

  const handleChange = (id: string, value: string) => {
    setValues(prev => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const missing = fields.find(field => field.required && !values[field.id])
    if (missing) {
      toast.error(`Please fill in the ${missing.label || missing.id} field.`)
      return
    }

    setLoading(true)
    try {
      await onSubmit(values)
      toast.success(successMessage)
      setValues(Object.fromEntries(fields.map(field => [field.id, ''])))
    } catch (err) {
      console.error(err)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={className || 'space-y-4'}>
      <div className={twoPerRow ? 'grid grid-cols-1 gap-4 sm:grid-cols-2' : 'space-y-4'}>
        {fields.map(field => (
          <div
            key={field.id}
            className={field.type === 'rating' ? 'flex flex-col items-center text-center' : ''}
          >
            <label
              htmlFor={field.id}
              className='text-base font-medium text-white dark:text-gray-100'
            >
              {field.label}
            </label>

            <div className='relative mt-2.5'>
              {field.type === 'textarea' ? (
                <textarea
                  id={field.id}
                  value={values[field.id]}
                  onChange={e => handleChange(field.id, e.target.value)}
                  placeholder={field.placeholder}
                  required={field.required}
                  className='block w-full rounded-3xl border border-zinc-800 bg-zinc-900 px-4 pt-4 pb-10 text-white placeholder-gray-500 caret-red-500 transition-all duration-200 focus:border-red-400 focus:outline-none'
                />
              ) : field.type === 'rating' ? (
                <StarRating
                  value={Number(values[field.id])}
                  onChange={val => handleChange(field.id, String(val))}
                />
              ) : field.type === 'select' && field.options ? (
                <select
                  id={field.id}
                  value={values[field.id]}
                  onChange={e => handleChange(field.id, e.target.value)}
                  required={field.required}
                  className={`block w-full rounded-3xl border border-zinc-800 
                    ${glassInput ? 'bg-white/10 backdrop-blur-md' : 'bg-zinc-900'} 
                    px-4 py-4 text-white placeholder-gray-500 caret-red-500 
                    transition-all duration-200 focus:border-red-400 focus:outline-none`}                >
                  <option value=''>-- Select --</option>
                  {field.options.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : field.type === 'date' ? (
                <div className={`block w-full rounded-3xl border border-zinc-800 relative z-10 
                ${glassInput ? 'bg-white/10 backdrop-blur-md' : 'bg-zinc-900'} 
                 px-4 py-4 text-white placeholder-gray-500 caret-red-500 
                 transition-all duration-200 focus:border-red-400 focus:outline-none`}
                >
                  <DatePicker
                    selected={values[field.id] ? new Date(values[field.id]) : null}
                    onChange={(date: Date | null) =>
                      handleChange(field.id, date?.toISOString() || '')
                    }
                    placeholderText='Pick a date'
                    minDate={new Date()} // prevent past
                    dateFormat='MMMM d, yyyy'
                  />
                </div>
              ) : (
                <input
                  id={field.id}
                  type={field.type}
                  value={values[field.id]}
                  onChange={e => handleChange(field.id, e.target.value)}
                  placeholder={field.placeholder}
                  required={field.required}
                  className={`block w-full rounded-3xl border border-zinc-800 
  ${glassInput ? 'bg-white/10 backdrop-blur-md' : 'bg-zinc-900'} 
  px-4 py-4 text-white placeholder-gray-500 caret-red-500 
  transition-all duration-200 focus:border-red-400 focus:outline-none`}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        type='submit'
        disabled={loading}
        className={`font-milky w-full cursor-pointer rounded-3xl border border-black bg-red-400 py-4 text-2xl font-bold tracking-widest text-black transition hover:border-blue-100 hover:bg-black hover:text-white ${glassInput ? 'bg-white/10 backdrop-blur-md' : 'bg-zinc-900'} 
        px-4 py-4 text-white placeholder-gray-500 caret-red-500 
        transition-all duration-200 focus:border-red-400 focus:outline-none
         ${loading ? 'cursor-not-allowed opacity-50' : ''
          }`}
      >
        {loading ? 'Sending...' : submitText}
      </button>
    </form>
  )
}

export default ReusableForm
