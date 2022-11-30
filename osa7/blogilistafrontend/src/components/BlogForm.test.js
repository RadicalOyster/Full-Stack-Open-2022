import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
    const user = userEvent.setup()
    const createBlog = jest.fn()

    render(<BlogForm createBlog={createBlog} />)

    const author = screen.getByPlaceholderText('Author')
    const title = screen.getByPlaceholderText('Title')
    const url = screen.getByPlaceholderText('Url')

    const submitButton = screen.getByText('Submit')

    await user.type(author, 'Mann Tester')
    await user.type(title, 'Testing React Things!')
    await user.type(url, 'www.testersmanncave.com')
    await user.click(submitButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    console.log(createBlog.mock.calls[0][0])
    expect(createBlog.mock.calls[0][0].author).toBe('Mann Tester')
    expect(createBlog.mock.calls[0][0].title).toBe('Testing React Things!')
    expect(createBlog.mock.calls[0][0].url).toBe('www.testersmanncave.com')
})
