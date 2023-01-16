import React from 'react'

function Post() {
  return (
    <>
        <h1>Post New User</h1>
        <form method='post' action="http://127.0.0.1:3000/user/detail">
            <input name='name' type="text" placeholder='Enter Name'/>
            <input name='age' type="number" placeholder='Enter Age' />
            <input name='height' type="number" placeholder='Enter Height' />
            <button type='submit'>Submit</button>
        </form>
    </>
  )
}

export default Post