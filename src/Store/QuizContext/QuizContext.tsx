import {createContext, useContext, useState, useReducer, useEffect} from 'react'
import {Props, State, QuizAction} from './QuizContext.types'
import axios from 'axios'
import {useAuth} from '../AuthContext/AuthContext'
import {ResponseTemplate} from '../../Generics.types'

export const QuizContext=createContext({});

export const useQuiz=()=>useContext(QuizContext);

const initialState:State={
    quizes:[],
    currentQuiz:null
}

export const QuizContextProvider=({children}:Props)=>{
    const [loading,setLoading]=useState(false)
    const {token}=useAuth();
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }

    const quizReducer=(state:State,action:QuizAction)=>{
        switch (action.type) {
            case "LOAD_QUIZ_LIST":
                return {
                    ...state,
                    quizes:action.payload
                }
            default:
                return state;
        }
    }

    useEffect(()=>{
        (
            async ()=>{
                if(token){
                    const {data:{data,ok}}=await axios.get<ResponseTemplate>('/api/quizes',config)
                    if(ok){
                        dispatch({
                            type:"LOAD_QUIZ_LIST",
                            payload:data
                        })
                    }
                }
            }
        )()
    },[token])

    const [state,dispatch]=useReducer(quizReducer,initialState)

    return(
        <QuizContext.Provider value={{
            quizLoading:loading,
            setQuizLoading:setLoading,
            quizes:state.quizes,
            currentQuiz:state.currentQuiz
        }}>
            {children}
        </QuizContext.Provider>
    )
}