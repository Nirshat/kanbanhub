import { useCallback, useState } from "react"

export const useToggle = () => {
  const [toggle, setToggle] = useState(false);
  
  const handleToggle = useCallback(() => {
    setToggle((prevState) => prevState === false ? true : false)
  }, [toggle])

  return {
    toggle, handleToggle
  }
}