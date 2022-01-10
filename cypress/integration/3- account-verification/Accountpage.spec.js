/// <reference types="cypress" />

describe('User account page', () => {

    beforeEach(() => {
      cy.login('sambouch1979@gmail.com', 'Password')
    })
  
    it('should actually be accessible and should have the correct page title', () => {
      cy.visit('/?controller=my-account')
      cy.title().should('eq', 'My account - My Store')
    })
  
    it('should have 05 button on account page  ', () => {
       
        cy.get(':nth-child(1) > .myaccount-link-list > :nth-child(1) > a > span').should('have.text', 'Order history and details')
        cy.get(':nth-child(1) > .myaccount-link-list > :nth-child(2) > a > span').should('have.text', 'My credit slips')
        cy.get(':nth-child(1) > .myaccount-link-list > :nth-child(3) > a > span').should('have.text', 'My addresses')
        cy.get(':nth-child(1) > .myaccount-link-list > :nth-child(4) > a > span').should('have.text', 'My personal information')
        cy.get('.lnk_wishlist > a > span').should('have.text', 'My wishlists')
        
      })
      it('should access personel information page', () => {
        cy.get(':nth-child(1) > .myaccount-link-list > :nth-child(4) > a > span').should('have.text', 'My personal information').click()
        cy.title().should('eq','Identity - My Store')
        cy.url().should('include', 'identity') 


           //check account informations
        //cy.get('[type="radio"]').check('2') 
        cy.get(':nth-child(4) > .top :checked').should('be.checked').and('have.value', '2')
    
        cy.get('#firstname').should('have.value','sam')
   
        cy.get('#lastname').should('have.value','smith')

        cy.get('#email').should('have.value','sambouch1979@gmail.com')
    
        cy.get('#days').should('have.value','8')
        cy.get('#months').should('have.value','8')
        cy.get('#years').should('have.value','1979')
    
        cy.get('#newsletter').should('be.checked').and('have.value', '1')

      //save form informations
        cy.get('#old_passwd').type('Password')
        cy.get('#passwd').type('Password')
        cy.get('#confirmation').type('Password')
        cy.get('button[type=submit]').click()
        cy.get('#center_column > div > p').should('have.class','alert alert-success')
        cy.get('#center_column > div > p').should('have.text','Your personal information has been successfully updated.')
        cy.get('.logout').click()
        cy.wait(2000)
        cy.url().should('include','?controller=authentication&back=identity')
        cy.title().should('eq','Authentication')
      })
  
  })