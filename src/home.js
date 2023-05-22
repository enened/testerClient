import Axios from 'axios'
import { useEffect, useState, useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import {Context} from "./context.js"
import Fuse from 'fuse.js'

function Home(){
    let navigate = useNavigate()
    const [tests, setTests] = useState([])
    const [showTests, setShowTests] = useState([])


    const options = {
        keys: [['testName']],
        threshold: 100,
        shouldSort: true,
        ignoreLocation: true,
        ignoreFieldNorm: true,
      }

    const fuse = new Fuse(tests, options)

    useEffect(()=>{
        Axios.get("https://s-tester.herokuapp.com/getTests").then((response)=>{
            setTests(response.data)
            setShowTests(response.data)
        })
    }, [])

    const search = (e)=>{
        if (e.target.value.trim()){
            let testsArr = fuse.search(e.target.value)
            for (let i = 0; i < testsArr.length; i++) {
                testsArr[i] = testsArr[i].item
            }
            setShowTests(testsArr)
        }

        else{
            setShowTests(tests)
        }
    }   

    const getTestInfo = (testId)=>{
        navigate("/test/?testId=" + testId)
    }


    return(
        <>
            <h1>Home</h1>
            <input className='searchBar' type="text" placeholder='Search for a test' onChange={search}/>
            {showTests.map((val, index)=>{
                return (
                    <>
                        <div className='testsSlide' key = {index} onClick={()=>{getTestInfo(val.testId)}}>
                            <p>{val.testName}</p>
                        </div>
                    </>
                )
            })}
        </>
    )
}

export default Home;