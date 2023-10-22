
import {useState} from 'react'

export const useInput = () => {
  const [input, setInput] = useState<string>('');
  const inputUpdater = (val:any) => {
    setInput(val);
  }

  return {
    input, inputUpdater
  }
}