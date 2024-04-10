import { useCallback, useEffect, useRef, useState } from 'react'
import { MdContentCopy } from "react-icons/md";
import { HiCheck } from "react-icons/hi";
import StrengthChecker from './components/StrengthChecker';

function App() {
  
  const [password, setpassword] = useState("");
  const [length, setlength] = useState(8);
  const [isUppercase, setisUppercase] = useState(false);
  const [isLowercase, setisLowercase] = useState(false);
  const [isNumber, setisNumber] = useState(false);
  const [issymbols, setissymbols] = useState(false);
  const [isCopied, setisCopied] = useState(false);

  const passwordRef = useRef(null)

  const generatePassword = useCallback(() => {
    let getPassword = "";
    let buildingPassword = "";
    if(isUppercase) buildingPassword+= "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if(isLowercase) buildingPassword+= "abcdefghijklmnopqrstuvwxyz"
    if(isNumber) buildingPassword+= "0123456789"
    if(issymbols) buildingPassword+= "@#$%&^_"    
    
    for(let i=0; i<length; i++){
      let char = Math.floor(Math.random()*buildingPassword.length)
      getPassword += buildingPassword.charAt(char);
    }

    if(buildingPassword="" || length === 0) return;
    setpassword(getPassword)

  }, [length,isUppercase,isLowercase,isNumber,issymbols,setpassword]);
    

  const copyToClipboard = useCallback(() => {
    if(password === "") return;
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
    setisCopied(true)
    setTimeout(() => {
      setisCopied(false)
    }, 2000);
  },[password])

  
  
  useEffect(()=>{
    generatePassword()
  },[length,isUppercase,isLowercase,isNumber,issymbols,generatePassword])

  
  
  return (
    <>
      <div className='w-full max-w-md mx-auto rounded-lg px-4 py-3 my-20 bg-gray-800 text-lg'>

        <h1 className='text-center my-3 text-3xl font-bold'
        >Password Generator</h1>

        <div className='flex rounded-lg overflow-hidden mb-4'>
          <input type='text' value={password}
            className='outline-none w-full py-1 px-4 bg-gray-700'
            placeholder='Your Password'
            ref={passwordRef}
            readOnly
          />
          <button
          className='outline-none bg-gray-700 text-white px-3 py-0.5 shrink-0'
          onClick={copyToClipboard}>
          {
            isCopied ? 
            <HiCheck className='text-xl font-semibold'/> : 
            <MdContentCopy className='text-xl font-bold'/>
          }
          </button>
        </div>

        <div className='flex flex-col gap-4 px-3'>
            <label className='w-full flex gap-x-4'>
              <p>Select Your Password Length : {length>9 ? length : "0"+length}</p>
              <input
                type='range' min={0} max={20}
                value={length} className='cursor pointer'
                onChange={(event) => setlength(event.target.value)}
              />
            </label>

            <div className='grid grid-cols-2 gap-y-2'>
              <label className='flex items-center gap-2'>
                <input type='checkbox' value={isUppercase}
                  onChange={()=> setisUppercase(prev => !prev)}
                />
                <p>Uppercase</p>
              </label>

              <label className='flex items-center gap-2'>
                <input type='checkbox' value={isLowercase}
                  onChange={()=> setisLowercase(prev => !prev)}
                />
                <p>Lowercase</p>
              </label>

              <label className='flex items-center gap-2'>
                <input type='checkbox' value={isNumber}
                  onChange={() => setisNumber(prev=> !prev)}
                />
                <p>Numbers</p>
              </label>

              <label className='flex items-center gap-2'>
                <input type='checkbox' value={issymbols}
                  onChange={()=>setissymbols(prev=> !prev)}
                />
                <p>Symbols</p>
              </label>
            </div>
        </div>

        <div className='mt-4 pl-3'>
          <p>Password Strength :
            <StrengthChecker 
              password={password}
              isUppercase={isUppercase}
              isLowercase={isLowercase}
              isNumber={isNumber}
              issymbols={issymbols}
            />
          </p>
        </div>
      </div>
    </>
  )
}

export default App
