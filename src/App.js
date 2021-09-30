import React from "react";
import styled from "styled-components";
import { Route } from "react-router-dom";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { db } from "./firebase";
import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { createDictionary, loadDictionaryFB } from "./redux/modules/dictionary";

import Dictionary from "./Dictionary";
import { async } from "@firebase/util";

function App() {

  const [list, setList] = React.useState(["영화관 가기", "매일 책읽기", "수영 배우기"]);
  const word = React.useRef(null);
  const expl = React.useRef(null);
  const exam = React.useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const dictionary_list = useSelector((state) => state.dictionary.list);
  console.log(dictionary_list);

  // firebase 확인을 위해 useEffect사용
  React.useEffect(async () => {

    dispatch(loadDictionaryFB());

    console.log(db);
    // // 파이어베이스 DB불러오는 순서 : 콜렉션 먼저 가져오기. 방법은 27번째줄
    //     collection(db, "dictionary") 
    //     const query = await getDocs(collection(db, "dictionary"));
    //     console.log(query);
    //     query.forEach((doc) => {
    //       console.log(doc.id, doc.data());
    //     });

    // 도큐먼트 추가할시도 콜렉션부터 !

    // addDoc(collection(db, "dictionary"), 
    // {word: "new word", expl: "new_expl", exam: "new_exam"});

    // UPDATE 하려면 먼저 doc이 필요해서 doc, updateDoc을 import 해줘야 함. 1. 도큐먼트를 가져온다.(docRef)
    // const docRef = doc(db, "dictionary", "DaVPb5fnR69Ij50etr61"); //여기까지가 doc에서 어떤아이디를 수정할것인지.
    // updateDoc(docRef, {word: "update word"});

    // DELETE 하려면 UPDATE와 비슷함 어떤Doc를 가져와서 삭제할거니 라고 해주면됨.    
    // const docRef = doc(db, "dictionary", "jT4zBjE3JTl7DSg3uvSg");
    // deleteDoc(docRef);

  }, []);

  // dictionary_list.map((list, index) => {
  //   console.log(list);
  //   console.log(index);
  // })

  // const addDictionaryList = () => {

  //   // setList([...list, text.current.value]);
  //   dispatch(createDictionary(Dictionary));
  //   console.log(Dictionary);
  // }

  return (
    <div className="App"g style={{
      background: "#eee",
      height: "100vh",
      width: "100vw",
      display: "flex",


    }}>
      
      <Container>
        <Title>My Dictionary</Title>
        <Line />
        <Route path="/" exact>
          {dictionary_list.map((list, index) => {
            return (
              <div key={index} style={{
                margin: "10px",
                background: "#fff",
              }}>  
                <Card>
                  <div>
                    <Text>단어</Text>
                    <Word>{list.word}</Word>
                  </div>
                  <div>
                    <Text>설명</Text>
                    <Word>{list.expl}</Word>
                  </div>
                  <div>
                    <Text>예시</Text>
                    <Point>{list.exam}</Point>
                  </div>
                </Card>
              </div>
            )
          })}
          <Plus onClick={
            () => {
              history.push("/dictionary");
            }}>
            <Add>추가</Add>
          </Plus>
        </Route>
        <Route path="/dictionary" exact component={Dictionary}>
        </Route>
      </Container>
      
    </div>
  );
}


// const Input = styled.div`
// max-width: 350px;
// min-height: 10vh;
// background-color: #fff;
// padding: 16px;
// margin: 20px auto;
// border-radius: 5px;
// border: 1px solid #ddd;
// display: flex;
// `;


const Container = styled.div`
width: 50vw;
max-width: 350px;
height: 80vh;
min-height: 60vh;
background-color: #E2FFF8;
padding: 16px;
border: 1px solid #BDBDBD;
border-radius: 5px;
position: relative;
margin: auto;
overflow: scroll;
`;

const Title = styled.h2`
color: black;
`;

const Line = styled.hr`
margin: 16px 0px;
border: 1px dotted #ddd;
`;

const Card = styled.div`
  border: 1px solid #bcbcbc;
  border-radius: 5px;
  margin: 15px auto;
`;

const Text = styled.p`
  font-size: 8pt;
  text-decoration: underline;
  padding-left: 10px;
  display: flex;
`;

const Word = styled.p`
  padding-left: 15px;
  font-size: 10pt;
`;

const Point = styled.p`
  padding-left: 15px;
  font-size: 10pt;
  color: #82BCFF;
`;


const Add = styled.p`
  font-size: 11pt;
  font-weight: bold;
  color: #fff;
  text-align: center;
  padding-top: 5px;
`;

const Plus = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50px;
  background: #6100FF;
  position: absolute;
  bottom: 15px;
  right: 15px;
`;

export default App;