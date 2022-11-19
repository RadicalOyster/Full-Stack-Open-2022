import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const testBlog = {
  title: 'This is a test for blogs',
  author: 'Tester Man',
  user: {
    name: 'TestUser'
  },
  likes: 5,
  url: 'www.blogtestersinc.com'
}

describe('Blog component...', () => {
  test('renders title', () => {
    render(<Blog blog={testBlog} />)

    const element = screen.getByText('This is a test for blogs')
    expect(element).toBeDefined()
  })

  test('renders author', () => {
    render(<Blog blog={testBlog} />)

    const element = screen.getByText('| Tester Man')
    expect(element).toBeDefined()
  })

  test('renders likes', () => {
    render(<Blog blog={testBlog} />)

    const element = screen.getByText('5 likes')
    expect(element).toBeDefined()
  })

  test('renders url', () => {
    render(<Blog blog={testBlog} />)

    const element = screen.getByText('www.blogtestersinc.com')
    expect(element).toBeDefined()
  })
})

describe('Interactivity tests:', () => {
  test('Pressing like button twice calls event handler twice', async () => {
    const mockHandler = jest.fn()

    render(
      <Blog blog={testBlog} handleLike={mockHandler} />
    )

    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})