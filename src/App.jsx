import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*(){}[]~`_-+="

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    
    setPassword(pass)
    
  }, [length, numberAllowed, charAllowed, setPassword])
  
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    // passwordRef.current?.setSelectionRange(0, 3)
    window.navigator.clipboard.writeText(password)
  },[password])
  
  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  return (
    <>
      <div className='w-full max-w-md px-5 py-5 mx-auto my-8 text-orange-400 bg-gray-800 shadow-lg rounded-xl'>
      <h1 className='my-3 text-2xl text-center text-white'>Password Generator</h1>
        <div className='flex mb-4 overflow-hidden rounded-md shadow'>
          <input type="text"
          value = {password}
          className='w-full px-3 py-1 rounded-sm outline-none'
          placeholder='Password'
          readOnly
          ref={passwordRef} />
          <button 
          onClick={copyPasswordToClipboard}
          className='px-3 py-0.5 text-white bg-blue-600 outline-none shrink-0 hover:bg-cyan-950'>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
            min = {8}
            max = {100}
            value = {length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}/>
            <label>Length: {length}</label>
          </div>
          <div className='flex text-sm gap-x-2'>
            <input type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev)
            }} />
            <label>Numbers</label>
            <div className='flex items-center gap-x-1'>
              <input type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                setCharAllowed((prev) => !prev)
              }}/>
              <label>Character</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App