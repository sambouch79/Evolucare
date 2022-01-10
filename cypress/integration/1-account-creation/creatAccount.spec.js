
/// <reference types="cypress" />


describe('creat account', () => {
  
  const myGolabalEmail = 'sambouch666@gmail.com'

    it('Click sign in button', () => {
      cy.visit('/')
      // Click sign in button
      cy.get('.login').click()
      // Should be on a new URL which includes 'controller=authentication&back=my-account'
      cy.url().should('include', 'controller=authentication&back=my-account')

    })
    it('Tape email and click creat account button', () => {
        cy.visit('/?controller=authentication&back=my-account')
        //tape email
        cy.get('#email_create').type('sambouch199@gmail.com')
        // Click sign in button
        cy.get('#SubmitCreate').click()
        cy.wait(3000)
        // Should be on a new URL which includes 'account-creation'
        cy.url().should('include', 'account-creation')
  
      })
      
      it('invalid email', () => {
        
          cy.visit('/?controller=authentication&back=my-account')
          //tape email
          cy.get('#email_create').type(myGolabalEmail)
          // Click sign in button
          cy.get('#SubmitCreate').click()
          cy.wait(5000)
        
          //clear and tape tape invalid email
          cy.get('input[name=email]').first().clear().type('hjkjkjhkjh')
          // Click another(password) input 
          cy.get('input[name=passwd]').click()
          
          //make assertion that input become red 
          const error='#account-creation_form > div:nth-child(1) > div:nth-child(5)'
          cy.get(error).should('have.class','form-error')
      })
      it('valid email', () => {
        cy.visit('/?controller=authentication&back=my-account')
        //tape email
        cy.get('#email_create').type(myGolabalEmail)
        // Click sign in button
        cy.get('#SubmitCreate').click()
        cy.wait(5000)
       
        //tape valid email
        cy.get('input[name=email]').first().clear().type(myGolabalEmail)
        // Click another(password) input 
        cy.get('input[name=passwd]').click()
         //make assertion that input become green
        const error='#account-creation_form > div:nth-child(1) > div:nth-child(5)'
        cy.get(error).should('have.class','form-ok')
      })
      
      it('fill all the form fields except one', () => {
        cy.visit('/?controller=authentication&back=my-account')
        //tape email
        cy.get('#email_create').type(myGolabalEmail)
        // Click sign in button
        cy.get('#SubmitCreate').click()
        cy.wait(4000)


        //choise civility ( Check checkbox element)
        cy.get('[type="radio"]').check('2') 
    
        //tape firstname
        cy.get('#customer_firstname').type('sam')
         //tape lastname
         cy.get('#customer_lastname').type('smith')
    
    
        //tape valid email
        cy.get('input[name=email]').first().clear().type(myGolabalEmail)
        // tape password
        cy.get('input[name=passwd]').type('Password')
        //tape bithday=08/08/1979
        cy.get('#days').select('8')
        cy.get('#months').select('8')
        cy.get('#years').select('1979')
        //adress form
        cy.get('#company').type('Evolucare')
        //cy.get('#address1').type('11 rue de lille')
        cy.get('#city').type('Lille') 
     
        
        //cy.get('#id_state')
        
        cy.get('#postcode').type('10001')
        cy.get('#id_country').select('United States')
        
       
        cy.get('#id_state').select('Arizona',{force:true}) // to select the actual option
        cy.get('#id_state').select('Arizona',{force:true}).invoke('val')
        .should('eq', '3')
    
        cy.get('#other').type('remplir tout les champs sauf un')
        cy.get('#phone').type('066666666')
        cy.get('#phone_mobile').type('0666666666')
        cy.get('#alias').type('test')
        cy.get('#uniform-newsletter').click({ multiple: true })
    
         //click register
        cy.get('#submitAccount').click()
        cy.get('#center_column > div').should('have.class','alert alert-danger')
        cy.wait(2000)
        cy.get('input[name=passwd]').type('Password')
        cy.get('#address1').type('11 rue de lille')
        cy.get('#submitAccount').click()
        cy.get('.account > span').should('have.text','sam smith')
        //cy.url().should('include', 'identity')
        cy.title().should('eq', 'My account - My Store')

        //check 05 button on dashboard personal account  
        cy.get(':nth-child(1) > .myaccount-link-list > :nth-child(1) > a > span').should('have.text', 'Order history and details')
        cy.get(':nth-child(1) > .myaccount-link-list > :nth-child(2) > a > span').should('have.text', 'My credit slips')
        cy.get(':nth-child(1) > .myaccount-link-list > :nth-child(3) > a > span').should('have.text', 'My addresses')
        cy.get(':nth-child(1) > .myaccount-link-list > :nth-child(4) > a > span').should('have.text', 'My personal information')
        cy.get('.lnk_wishlist > a > span').should('have.text', 'My wishlists')
          
        //access personel information page
        cy.get(':nth-child(1) > .myaccount-link-list > :nth-child(4) > a > span').should('have.text', 'My personal information').click()
        cy.wait(2000)
        cy.title().should('eq','Identity - My Store')
        cy.url().should('include', 'identity') 

        //check account informations
     
        cy.get(':nth-child(4) > .top :checked').should('be.checked').and('have.value', '2')
    
        cy.get('#firstname').should('have.value','sam')
   
        cy.get('#lastname').should('have.value','smith')

        cy.get('#email').should('have.value',myGolabalEmail)
    
        cy.get('#days').should('have.value','8')
        cy.get('#months').should('have.value','8')
        cy.get('#years').should('have.value','1979')
    
        cy.get('#newsletter').should('be.checked').and('have.value', '1')

        //save form
        cy.get('#old_passwd').type('Password')
        cy.get('#passwd').type('Password')
        cy.get('#confirmation').type('Password')
        cy.get(':nth-child(11) > .btn > span').click()
        cy.get('#center_column > div > p').should('have.class','alert alert-success')
        cy.get('.alert').contains('Your personal information has been successfully updated.')
        
        //logout
        cy.get('.logout').click()
        cy.wait(5000)
        cy.url().should('include','?controller=authentication&back=identity')
        cy.title().should('eq','Login - My Store')

        //login
        cy.login(myGolabalEmail, 'Password')
        cy.wait(3000)
        cy.get('.account > span').should('have.text','Sam smith')
        cy.title().should('eq', 'My account - My Store')


      })


  })
  