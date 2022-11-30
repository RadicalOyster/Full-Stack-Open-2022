import { useState, useEffect } from 'react'
import axios from 'axios'

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])

    useEffect(() => {
        axios.get(baseUrl).then(
            res => {
                setResources(res.data)
            })
    }, [baseUrl])



    const create = (resource) => {
        axios.post(baseUrl, resource).then(
            res => {
                setResources(resources.concat(res.data))
            }
        )
    }

    const service = {
        create
    }

    return [
        resources, service
    ]
}