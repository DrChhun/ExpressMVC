import React from 'react'
import { useEffect, useState } from 'react';
import Axios from 'axios'

function All() {

    const [user, setUser] = useState([]);

    const getData = () => {
        Axios.get('http://127.0.0.1:3000/user/detail')
            .then(res => {
                setUser(res.data.data.users)
                console.table(res.data.data.users)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getData();
        console.log(user);
    }, [])


    return (
        <>
            <table>
                <thead>
                    <tr>
                        <td>Index</td>
                        <td>Name</td>
                        <td>Age</td>
                        <td>Height</td>
                    </tr>
                </thead>
                <tbody>
                    {user.map((user, index) => (
                        <tr key={index}>
                            <td>{index}</td>
                            <td>{user.name}</td>
                            <td>{user.age}</td>
                            <td>{user.height}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default All