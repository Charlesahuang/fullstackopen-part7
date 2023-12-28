import React, { useState } from "react"
import { useHistory } from "react-router-dom";
import { useField } from "../hooks";
const CreateNew = (props) => {
  const history = useHistory()
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    history.push('/');
  }

  // 重置表单字段的函数
  const resetForm = () => {
    content.onChange({ target: { value: '' } })
    author.onChange({ target: { value: '' } })
    info.onChange({ target: { value: '' } })
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} reset="" />
        </div>
        <div>
          author
          <input {...author} reset="" />
        </div>
        <div>
          url for more info
          <input {...info} reset="" />
        </div>
        <button>create</button>
        <button type="button" onClick={resetForm}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew;