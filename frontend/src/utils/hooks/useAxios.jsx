import {useState, useEffect} from 'react';
import axios from 'axios'

export function useAxios(url){
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        if(!url) return;
        const fetchData = async () => {
            try{
                const {data} = await axios.get(url);
                setData(data);
            }catch(err){
                console.log(err);
                setError(true);
            }
        }
        fetchData();
    },[url]);

    return {data, error};
}