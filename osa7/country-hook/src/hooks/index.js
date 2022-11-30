import { useState, useEffect } from 'react'
import axios from 'axios'

export const useCountry = ({ value }) => {
    const [country, setCountry] = useState(null)
    useEffect(
        () => {
            const fetchCountry = async () => {
                if (value) {
                    try {
                        const res = await axios.get(`https://restcountries.com/v3.1/name/${value}?fullText=true`)
                        setCountry(res.data[0])
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
            fetchCountry()
        },
        [value],
    );
    return country
}