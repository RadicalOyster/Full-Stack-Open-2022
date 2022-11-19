/* eslint-disable no-undef */
const user = {
  name: 'Tester Mann',
  username: 'Testyboooi',
  password: 'testtest'
}

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.get('form').contains('Username')
  })

  describe('Login', function () {
    it('is successful with valid credentials', function () {
      cy.contains('Log in').click()
      cy.get('#username').type('Testyboooi')
      cy.get('#password').type('testtest')
      cy.get('#loginButton').click()
      cy.contains('Logged in as Tester Mann')
    })

    it('fails with invalid credentials', function () {
      cy.contains('Log in').click()
      cy.get('#username').type('Testyboooi')
      cy.get('#password').type('hotdog123')
      cy.get('#loginButton').click()
      cy.get('#error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'Testyboooi', password: 'testtest' })
    })

    it('a blog can be created', function () {
      cy.contains('New blog').click()
      cy.get('#title').type('Blogging is Cool!')
      cy.get('#author').type('Bloggart Bloghead')
      cy.get('#url').type('www.bloggersunited.gov')
      cy.get('#submitBlog').click()
      cy.contains('Added new blog Blogging is Cool! by Bloggart Bloghead').should('have.css', 'color', 'rgb(0, 128, 0)')
      cy.get('.blogFrame').should('contain', 'Blogging is Cool!')
      cy.get('.blogFrame').should('contain', 'Bloggart Bloghead')
      cy.get('.blogFrame').find('span').should('contain', 'www.bloggersunited.gov')
    })

    it('clicking like on a blog increments the like counter', function () {
      cy.createBlog({
        title: 'Blogging is Cool!',
        author: 'Bloggart Bloghead',
        url: 'www.bloggersunited.gov'
      })
      cy.get('.clickableText').click()
      cy.get('.likeButton').click()
      cy.get('.blogsContainer').children().first().should('contain', '1 likes')
    })

    it('user can delete their own blog', function () {
      cy.createBlog({
        title: 'Blogging is Cool!',
        author: 'Bloggart Bloghead',
        url: 'www.bloggersunited.gov'
      })
      cy.get('.clickableText').click()
      cy.get('.blogsContainer').children().get('.blogFrame').should('exist')
      cy.get('#deleteButton').click()
      cy.get('.blogsContainer').children().should('not.exist')
    })

    it('user cannot delete another user\'s blog', function () {
      const newUser = {
        name: 'Tester Dan',
        username: 'dannyo',
        password: 'danishere'
      }

      cy.request('POST', 'http://localhost:3003/api/users', newUser)

      cy.createBlog({
        title: 'Blogging is Cool!',
        author: 'Bloggart Bloghead',
        url: 'www.bloggersunited.gov'
      })
      cy.get('.logoutButton').click()

      cy.contains('Log in').click()
      cy.get('#username').type('dannyo')
      cy.get('#password').type('danishere')
      cy.get('#loginButton').click()

      cy.get('.clickableText').click()
      cy.get('#deleteButton').should('not.be.visible')
    })

    it('blogs are ordered by number of likes', function () {
      const newBlog = {
        title: 'The History of Blogging',
        author: 'Sir Bloggert',
        url: 'www.thequeensbloggers.uk'
      }

      const newBlog2 = {
        title: 'Blogging for the Ages',
        author: 'Mr Blogger',
        url: 'www.blogginguniverse15.fi'
      }

      cy.createBlog( newBlog )
      cy.createBlog( newBlog2 )

      const blogOne = cy.get('.blogsContainer').contains(newBlog.title)
      const blogTwo = cy.get('.blogsContainer').contains(newBlog2.title)

      blogOne.click()
      blogTwo.click()

      cy.contains(newBlog2.url).parent().find('.likeButton').click()
      cy.contains(newBlog2.url).parent().contains('1 likes')

      cy.get('.blogsContainer').children().first().should('contain', 'Blogging for the Ages')

      cy.contains(newBlog.url).parent().find('.likeButton').click()
      cy.contains(newBlog.url).parent().contains('1 likes')
      cy.contains(newBlog.url).parent().find('.likeButton').click()
      cy.contains(newBlog.url).parent().contains('2 likes')

      cy.get('.blogsContainer').children().first().should('contain', 'The History of Blogging')
    })
  })
})