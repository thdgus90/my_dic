// 리액트 패키지를 불러옵니다.
import React from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { addDictionaryFB } from "./redux/modules/dictionary"
import Button from "@material-ui/core/Button";
import {db} from "./firebase";
import {collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc} from "firebase/firestore";


const Dictionary = (props) => {
    const history = useHistory();
    const my_lists = useSelector((state) => state.dictionary.list);

    const word = React.useRef(null);
    const expl = React.useRef(null);
    const exam = React.useRef(null);
    const dispatch = useDispatch();

    return (
        <Container>
            <Title>단어 추가하기</Title>
            <Input>
                <Text style={{ padding: "5px 0px" }}>단어</Text>
                <input type="text" ref={word} style={{
                    padding: "5px", width: "96%", height: "30px"
                }} />
            </Input>
            <Input>
                <Text style={{ padding: "5px 0px" }}>설명</Text>
                <input type="text" ref={expl} style={{
                    padding: "5px", width: "96%", height: "30px"
                }} />
            </Input>
            <Input>
                <Text style={{ padding: "5px 0px" }}>예시</Text>
                <input type="text" ref={exam} style={{
                    padding: "5px", width: "96%", height: "30px"
                }} />
            </Input>
            <Button variant="contained" style={{
                width: "100%", color: "white", background: "#6100FF", fontWeight: "bold", margin: "10px auto", padding: "10px"
            }} onClick={() => {
                
                dispatch(addDictionaryFB(
                    {
                        word: word.current.value,
                        expl: expl.current.value,
                        exam: exam.current.value
                    }
                ));

                history.push("/");
            }}>추가하기</Button>
        </Container>
    );
};

const Container = styled.div`
max-width: 350px;
min-height: 60vh;
background-color: #E2FFF8;
padding: 16px;
margin: 20px auto;
border-radius: 5px;
position: relative;
`;

const Title = styled.h2`
color: black;
`;

const Input = styled.div`
max-width: 350px;
min-height: 10vh;
background-color: #fff;
padding: 10px;
margin: 20px auto;
border-radius: 5px;
border: 1px solid #ddd;
`;

const Text = styled.div`
  font-size: 8pt;
  text-decoration: underline;
`;

export default Dictionary;