import { useEffect, useState, useRef } from "react";


export const useFetch = ( url ) => {
    
    // Constante para validar que el componente no haya sido desmontado
    const isMounted = useRef(true);

    const [state, setState] = useState({data: null, loading: true, error: null});


    useEffect(() => {
        // No hace nada, solo se ejecuta cuando se desmonta
        return () => {
            isMounted.current = false
        }
    }, [])

    useEffect(() => {
        
        setState({
            loading: true,
            error: null,
            data: null
        })

        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                if (isMounted.current){
                    setState({
                        loading: false,
                        error: null,
                        data
                    })
                }
            });
        
    }, [url])

    return state;
}
