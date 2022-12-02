import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
    const [author, setAuthor] = useState('')
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')

    const handleAuthorChange = (event) => {
        setAuthor(event.target.value)
    }

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleUrlChange = (event) => {
        setUrl(event.target.value)
    }

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            author: author,
            title: title,
            url: url,
        })

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h3>Create new</h3>
            <Form onSubmit={addBlog}>
                <Form.Group>
                    <div>
                        <Form.Label>Title</Form.Label>{' '}
                        <Form.Control
                            id="title"
                            placeholder="Title"
                            type="text"
                            value={title}
                            onChange={handleTitleChange}
                        />
                    </div>
                    <div>
                        <Form.Label>Author</Form.Label>{' '}
                        <Form.Control
                            id="author"
                            placeholder="Author"
                            type="text"
                            value={author}
                            onChange={handleAuthorChange}
                        />
                    </div>
                    <div>
                        <Form.Label>Url</Form.Label>{' '}
                        <Form.Control
                            id="url"
                            placeholder="Url"
                            type="text"
                            value={url}
                            onChange={handleUrlChange}
                        />
                    </div>
                    <br />
                    <Button id="submitBlog" type="submit">
                        Submit
                    </Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default BlogForm
