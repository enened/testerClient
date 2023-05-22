import {useState} from 'react';

function Question({questionInfo, setScore}){
    const [displayAnswer, setDisplayAnswer] = useState(false)
    const [correctAnswer, setCorrectAnswer] = useState(false)
    const [shortResponse, setShortResponse] = useState("")
    const [answerChoosen, setAnswerChoosen] = useState("")

    const answerChoices = ['A', 'B', 'C', 'D',  'F', 'G', 'H','J']

    // check users answer, change score, and display correct answers
    const checkAnswer = (answerChoice)=>{
        setAnswerChoosen(answerChoice)
        setDisplayAnswer(true);


        if (answerChoice == questionInfo.answer){
            setCorrectAnswer(true)
            setScore((score)=>{return score+1})
        }  
        else{
            setCorrectAnswer(false)
        }
    }

    const _arrayBufferToBase64 = ( buffer ) => {
        var binary = '';
        var bytes = new Uint8Array( buffer );
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        return window.btoa( binary );
    }

    return(

        <div className='questionSlide'>
            {displayAnswer ? <img className='questionImages' style={correctAnswer ? {'border': '5px solid green'} : {'border': ' 5px solid red'}} src = {`data:image/${questionInfo.question.contentType};base64,${_arrayBufferToBase64(questionInfo.question.data)}`}/>
            :
            <img className='questionImages' src = {`data:image/${questionInfo.question.contentType};base64,${_arrayBufferToBase64(questionInfo.question.data)}`}/>
            }


            {displayAnswer && 
            <>
                <p>Your choice: {answerChoosen}</p>
                <p>Correct answer: {questionInfo.answer}</p>
                <p>{correctAnswer ? "1/1" : "0/1"}</p>
            </>
            }


            <br/>
            {answerChoices.slice(0, 4).includes(questionInfo.answer) ?
            <>
                {displayAnswer ? <button className='answerChoice' style={'A' == questionInfo.answer ? {'backgroundColor': 'rgb(146, 226, 202)'} : {'backgroundColor': 'rgb(255, 137, 137)'}}>A</button> : <button className='answerChoice' onClick={()=>{checkAnswer('A')}}>A</button> }
                {displayAnswer ? <button className='answerChoice' style={'B' == questionInfo.answer ? {'backgroundColor': 'rgb(146, 226, 202)'} : {'backgroundColor': 'rgb(255, 137, 137)'}}>B</button> : <button className='answerChoice'  onClick={()=>{checkAnswer('B')}}>B</button>}
                <br/> 
                {displayAnswer ? <button className='answerChoice' style={'C' == questionInfo.answer ? {'backgroundColor': 'rgb(146, 226, 202)'} : {'backgroundColor': 'rgb(255, 137, 137)'}}>C</button> : <button className='answerChoice'  onClick={()=>{checkAnswer('C')}}>C</button>}
                {displayAnswer ? <button className='answerChoice' style={'D' == questionInfo.answer ? {'backgroundColor': 'rgb(146, 226, 202)'} : {'backgroundColor': 'rgb(255, 137, 137)'}}>D</button> : <button className='answerChoice'  onClick={()=>{checkAnswer('D')}}>D</button>}
            </> 
            :
            <>
                {answerChoices.includes(questionInfo.answer) ? 
                <>
                    {displayAnswer ? <button className='answerChoice' style={'F' == questionInfo.answer ? {'backgroundColor': 'rgb(146, 226, 202)'} : {'backgroundColor': 'rgb(255, 137, 137)'}}>F</button> : <button className='answerChoice'  onClick={()=>{checkAnswer('F')}}>F</button>}
                    {displayAnswer ? <button className='answerChoice' style={'G' == questionInfo.answer ? {'backgroundColor': 'rgb(146, 226, 202)'} : {'backgroundColor': 'rgb(255, 137, 137)'}}>G</button> : <button className='answerChoice'  onClick={()=>{checkAnswer('G')}}>G</button>}
                    <br/> 
                    {displayAnswer ? <button className='answerChoice' style={'H' == questionInfo.answer ? {'backgroundColor': 'rgb(146, 226, 202)'} : {'backgroundColor': 'rgb(255, 137, 137)'}}>H</button> : <button className='answerChoice'  onClick={()=>{checkAnswer('H')}}>H</button>}
                    {displayAnswer ? <button className='answerChoice' style={'J' == questionInfo.answer ? {'backgroundColor': 'rgb(146, 226, 202)'} : {'backgroundColor': 'rgb(255, 137, 137)'}}>J</button> : <button className='answerChoice'  onClick={()=>{checkAnswer('J')}}>J</button>}
                </>
                :
                <>
                    <input className='normalInput' onChange={(e)=>{setShortResponse(e.target.value.trim())}} disabled={displayAnswer} type="text" placeholder='Enter an answer'/>
                    <br/> 
                    {!displayAnswer && <button className='normalButton' onClick={()=>{checkAnswer(shortResponse)}}>Submit answer</button>}
                </>
                }
            </>
            }
        </div>
    )
}

export default Question;