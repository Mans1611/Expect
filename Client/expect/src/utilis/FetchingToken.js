import axios from "axios";
import { useNavigate } from "react-router-dom";
import { globalUser } from "../Context/HomeContext";
import Cookies from "universal-cookie";

const FetchingToken = async()=>{
    //const navigate = useNavigate();
    const store = globalUser();
    const cookie = new Cookies();

    

}

export default FetchingToken;