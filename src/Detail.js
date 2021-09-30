import React from "react";
import {useParams} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {useHistory} from "react-router-dom";

const Detail = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const dictionary_index = params.index;
    const dictionary_list = useSelector((state) => state.dictionary.list);

    return (
        <div>
        </div>
        )
    };

export default Detail;