import { useState ,useCallback, useEffect} from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberallowed, setNumberallowed] = useState(false)
  const [specialcharallowed, setSpecialcharallowed] = useState(false)
  const [password, setPassword] = useState('')


  const copytoclipboard = useCallback(()=>{
    window.navigator.clipboard.writeText(password)
    alert("text copied")
  },[password])

  const passwordGenrator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    let num = "0123456789"
    let special = "!@#$%^&*()_+"

    if(numberallowed) str += num
    if(specialcharallowed) str += special

    for(let i=0; i<length; i++){
      let ind = Math.floor(Math.random() * str.length+1)
      pass += str.charAt(ind);
    }

    setPassword(pass)

  },[length,numberallowed,specialcharallowed,setPassword])

  useEffect(()=>{
    passwordGenrator()
  },[length,numberallowed,specialcharallowed,passwordGenrator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
        <h1 className="text-white text-center my-3" >Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4' >
          <input type="text"
            readOnly
            value={password}
            placeholder="Password"
            className='outline-none w-full py-1 px-3'
          />
          <button
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          onClick={copytoclipboard}
          >
            copy
          </button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
              min={8}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e)=>setLength(e.target.value)}
            />
            <label >length : {length} </label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              defaultChecked={numberallowed}
              type="checkbox" 
              id='numberInput'
              onChange={()=>{
                setNumberallowed((prev) => !prev)
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              defaultChecked = {specialcharallowed}
              id='specialInput'
              type="checkbox" 
              onChange={()=>{
                setSpecialcharallowed((prev) => !prev)
              }}
            />
            <label htmlFor="specialInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
