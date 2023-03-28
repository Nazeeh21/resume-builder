import { useRouter } from "next/router";
import { useState } from "react";

const CreateResume = () => {
  const [resume, setResume] = useState({
    name: '', workExp: ''
  })
  const router = useRouter()

const createResume = async ()=> {
    if (!resume.name || !resume.workExp) return
    resume.id = uuid()
    const contract = await getContract()
    try {
      const result = await contract.writeInteraction({
        function: "createResume",
        resume
      })
      console.log('result:', result)
      router.push('/')
    } catch (err) {
      console.log('error:', err)
    }
  } 
  return (
    <div>
      <h1>Create Resume</h1>
      <input
        value={resume.name}
        placeholder="Your name"
        onChange={e => setResume({ ...resume, name: e.target.value})}
        style={inputStyle}
      />
      <textarea
        value={resume.workExp}
        placeholder="Work Exp"
        onChange={e => setResume({ ...resume, workExp: e.target.value})}
        style={textAreaStyle}
      />
      <button style={buttonStyle} onClick={createResume}>Create Resume</button>
    </div>
  )
}


const formContainerStyle = {
  width: '900px',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start'
}

const inputStyle = {
  width: '300px',
  padding: '8px',
  fontSize: '18px',
  border: 'none',
  outline: 'none',
  marginBottom: '20px'
}

const buttonStyle = {
  width: '200px',
  padding: '10px 0px'
}

const textAreaStyle = {
  width: '100%',
  height: '300px',
  marginBottom: '20px',
  padding: '20px'
}

export default CreateResume