// dictionary.js
import { async } from "@firebase/util";
import {collection,doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc} from "firebase/firestore";
import {db} from "../../firebase";

// Actions
const LOAD = 'dictionary/LOAD';
const CREATE = 'dictionary/CREATE';

const initialState ={
    list: [
        // {word: "테스트입니다.",
        //  expl: "여기", 
        //  exam:"에요"},
        //  {word: "동우님.",
        //  expl: "우석님", 
        //  exam:"수인님"},
    ],
};

// Action Creators
export function loadDictionary(dictionary_list){
    console.log('액션생성?');
    return{type: LOAD, dictionary_list};
}

export function createDictionary(dictionary_list){
    return{type: CREATE, dictionary_list};
}

// MiddleWares
export const loadDictionaryFB = (()=>{
    return async function (dispatch){
        const dictionary_data = await getDocs(collection(db,"dictionary"));
        console.log(dictionary_data);

        let dictionary_list = [];

        dictionary_data.forEach((doc)=> {
            console.log(doc.data());
            dictionary_list.push({...doc.data()});
        });
        console.log(dictionary_list);

        dispatch(loadDictionary(dictionary_list));
    }
})

export const addDictionaryFB = (dictionary)=>{
    return async function (dispatch){
        const docRef = await addDoc(collection(db,"dictionary"), dictionary);
        const _dictionary = await getDoc(docRef);
        const dictionary_data = {id: _dictionary.id, ..._dictionary.data()}
        console.log(dictionary_data);

        dispatch(createDictionary(dictionary_data));
    }
};

// Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case "dictionary/LOAD": {
            return {list: action.dictionary_list};
            
        }
        case "dictionary/CREATE": {
            const new_dictionary_list = [...state.list, action.dictionary_list];
            console.log(state, action);
            return {list: new_dictionary_list};
            // {list: new_dictionary_list};
            
        }
            default: 
                return state;
    }
}