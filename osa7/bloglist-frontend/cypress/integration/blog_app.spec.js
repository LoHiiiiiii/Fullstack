describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.request('POST', 'http://localhost:3003/api/users/', {
            username: 'Test User',
            name: 'Mr. test',
            password: 'password',
        })
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.contains('log in to application')
        cy.contains('username')
        cy.contains('password')
        cy.contains('login')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('#username').type('Test User')
            cy.get('#password').type('password')
            cy.get('#loginButton').click()
            cy.get('#loginButton').should('not.exist')
        })

        it('fails with wrong credentials', function () {
            cy.get('#username').type('Test User')
            cy.get('#password').type('incorrect password')
            cy.get('#loginButton').click()
            cy.contains('Wrong username or password')
        })
    })

    describe('When logged in', function () {
        beforeEach(function () {
            cy.login({ username: 'Test User', password: 'password' })
        })

        it('a blog can be created', function () {
            cy.get('#createButton').click()
            cy.get('#titleField').type('Blog name')
            cy.get('#authorField').type('Blog author')
            cy.get('#urlField').type('Blog url')
            cy.get('#submitButton').click()
            cy.contains('a new')
            cy.get('#blogList').contains('Blog name')
            cy.get('#blogList').contains('Blog author')
            cy.contains('view')
        })

        it('a blog can be liked', function () {
            cy.createBlog({
                blog: {
                    title: 'Blog name',
                    author: 'Blog author',
                    url: 'Blog url',
                },
            })

            cy.get('#viewButton').click()
            cy.contains('likes 0')
            cy.contains('like').click()
            cy.contains('likes 1')
        })

        it('a blog can be removed', function () {
            cy.createBlog({
                blog: {
                    title: 'Blog name',
                    author: 'Blog author',
                    url: 'Blog url',
                },
            })

            cy.get('#viewButton').click()
            cy.get('#removeButton').click()
            cy.get('#viewButton').should('not.exist')
        })

        it('blogs are sorted corretly', function () {
            cy.createBlog({
                blog: {
                    title: 'Blog name1',
                    author: 'Blog author1',
                    url: 'Blog url1',
                },
            })
            cy.createBlog({
                blog: {
                    title: 'Blog name2',
                    author: 'Blog author2',
                    url: 'Blog url2',
                },
            })
            cy.createBlog({
                blog: {
                    title: 'Blog name3',
                    author: 'Blog author3',
                    url: 'Blog url3',
                },
            })

            cy.contains('author1').contains('view').click()
            cy.contains('author1').contains('like').click()

            cy.contains('author2').contains('view').click()
            cy.contains('author2').contains('like').click()
            cy.contains('author2')
                .contains('likes 1')
                .parent()
                .contains('like')
                .click()

            cy.contains('author3').contains('view').click()
            cy.contains('author3').contains('like').click()
            cy.contains('author3')
                .contains('likes 1')
                .parent()
                .contains('like')
                .click()
            cy.contains('author3')
                .contains('likes 2')
                .parent()
                .contains('like')
                .click()

            cy.contains('author3')
                .contains('likes 3')
                .get('.likes')
                .then((likes) => {
                    cy.expect(likes[0].innerText).to.include('likes 3')
                    cy.expect(likes[1].innerText).to.include('likes 2')
                    cy.expect(likes[2].innerText).to.include('likes 1')
                })
        })
    })
})
