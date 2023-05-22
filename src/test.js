import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Axios from 'axios'
import Question from './question';
import Reading from './reading';

function Test(){
    const [queryParameters] = useSearchParams()
    const [test, setTest] = useState([])
    const [testName, setTestName] = useState("")
    const [score, setScore] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        Axios.get("https://s-tester.herokuapp.com/getTestInfo/?testId=" + queryParameters.get("testId")).then((response)=>{
            setTest(response.data)
            setTestName(response.data[0].testName)
            setLoading(false)
         })
    }, [])



    return(
        <>
            <h1>{testName}</h1>
            {test.map((val, index)=>{
                return(
                    <>
                        {val.reading && <Reading reading = {val.reading}/>}
                        <Question questionInfo = {val} setScore = {setScore}/>
                    </>
                )
            })}
            {!loading ? <p>{score}/{test.length}</p>: <p className='inform'>Loading...</p>}
        </>
    )
}

export default Test;