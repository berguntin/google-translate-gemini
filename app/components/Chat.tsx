'use client'

import { useCompletion } from 'ai/react'
import { useEffect, useState } from 'react'
import { useDebounce } from '@uidotdev/usehooks'

import { TranslateTextOutput } from './TranslateTextOutput'
import { LanguageSelector } from './LanguageSelector'
import { TranslateTextInput } from './TranslateTextInput'

import { FROM_LANGUAGES, TO_LANGUAGES } from '../consts'

export function Chat () {
  const [from, setFrom] = useState(FROM_LANGUAGES[0])
  const [to, setTo] = useState(TO_LANGUAGES[0])

  const [text, setText] = useState('')

  const {complete, completion, isLoading, stop} = useCompletion({
    api: '/api/translate',
  })

  const debouncedText = useDebounce(text, 500)
  
  useEffect(()=> {
    
    if (debouncedText !== '') {
      
      complete(debouncedText, {
        body: {
          from,
           to
        }
      })
      
    }
    
    
  }, [debouncedText, from, to])

const handleChange = (text: string) => {
  stop
  setText(text)
  
}

  return (
    <>
      <LanguageSelector from={from} setFrom={setFrom} to={to} setTo={setTo} />

      <div className='flex'>
        <TranslateTextInput text={text} onChange={handleChange}/>
        <TranslateTextOutput result={completion} isLoading={isLoading}/>
      </div>
    </>
  )
}
