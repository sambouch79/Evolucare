
/// <reference types="cypress" />


describe('creat account', () => {
  beforeEach(()=>{
    cy.fixture('user').then((data)=>{
          this.user= data.user
    })
  })
  
 

    it('Click sign in button', () => {
      cy.visit('/')
      // Click sign in button
      cy.get('a[title="Log in to your customer account"]').click()
      // Should be on a new URL which includes 'controller=authentication&back=my-account'
      cy.url().should('include', 'controller=authentication&back=my-account')

    })

    it('Tape email and click creat account button', () => {
        cy.visit('/?controller=authentication&back=my-account')
        //tape email
        cy.get('#email_create').type(this.user.email)
        // Click sign in button
        cy.get('#SubmitCreate').invoke('attr','value').should('eq','Create an account').click()
      
        // Should be on a new URL which includes 'account-creation'
        cy.url().should('include', 'account-creation')
  
      })
      
      it('invalid email', () => {
        
          cy.visit('/?controller=authentication&back=my-account')
          //type email
          cy.get('#email_create').type(this.user.email)
          // Click sign in button
          cy.get('#SubmitCreate').invoke('attr','value').should('eq','Create an account').click()
        
          //clear and tape tape invalid email
          cy.get('input[name=email]').first().clear().type(this.user.ivalid_mail)
          // Click another(password) input 
          cy.get('input[name=passwd]').click()
          
          //make assertion that input become red 
          cy.get('[data-validate="isEmail"]').parent().should('have.class','form-error')

      })
      it('valid email', () => {
        cy.visit('/?controller=authentication&back=my-account')
        //tape email
        cy.get('#email_create').type(this.user.email)
        // Click sign in button
        cy.get('#SubmitCreate').click()
        //tape valid email
        cy.get('input[name=email]').first().clear().type(this.user.email)
        // Click another(password) input 
        cy.get('input[name=passwd]').click()
         //make assertion that input become green
        cy.get('[data-validate="isEmail"]').parent().should('have.class','form-ok')
      })
      
      it('fill all the form fields except one', () => {
        cy.visit('/?controller=authentication&back=my-account')
        //tape email
        cy.get('#email_create').type(this.user.email)
        // Click sign in button
        cy.get('#SubmitCreate').click()
        //choise civility ( Check checkbox element)
        cy.contains(`${this.user.civility}`).find('[id="id_gender1"]').check()
    
        //tape firstname
        cy.get('#customer_firstname').type(this.user.first_name)
         //tape lastname
         cy.get('#customer_lastname').type(this.user.familty_name)
    
    
        //tape valid email
        cy.get('input[name=email]').first().clear().type(this.user.email)
        // tape password
        cy.get('input[name=passwd]').type(this.user.password)
        //tape bithday=08/08/1979
        cy.get('#days').select(this.user.birth_day)
        cy.get('#months').select(this.user.birth_month)
        cy.get('#years').select(this.user.birth_year)
        //adress form
        cy.get('#company').type(this.user.company)
        //cy.get('#address1').type('11 rue de lille')
        cy.get('#city').type(this.user.city) 
     
        
        //cy.get('#id_state')
        
        cy.get('#postcode').type(this.user.postal_code)
        cy.get('#id_country').select('United States')
        
       
        cy.get('#id_state').select('Arizona',{force:true}) // to select the actual option
        cy.get('#id_state').select('Arizona',{force:true}).invoke('val')
        .should('eq', '3')
    
        cy.get('#other').type('remplir tout les champs sauf un')
        cy.get('#phone').type(this.user.phone)
        cy.get('#phone_mobile').type(this.user.mobile)
        cy.get('#alias').type(this.user.alias)
        cy.get('#uniform-newsletter').click({ multiple: true })
    
         //click register
        cy.get('#submitAccount').click()
        cy.get('#center_column > div').should('have.class','alert alert-danger')
     
        cy.get('input[name=passwd]').type(this.user.password)
        cy.get('#address1').type(this.user.street_address)
        cy.get('#submitAccount').click()
        cy.get('.account > span').should('have.text',`${this.user.first_name} ${this.user.family_name}`)
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
     
        cy.title().should('eq','Identity - My Store')
        cy.url().should('include', 'identity') 

        //check account informations
     
        cy.get(':nth-child(4) > .top :checked').should('be.checked').and('have.value', '2')
    
        cy.get('#firstname').should('have.value',this.user.first_name)
   
        cy.get('#lastname').should('have.value',this.user.family_name)

        cy.get('#email').should('have.value',this.user.email)
    
        cy.get('#days').should('have.value','8')
        cy.get('#months').should('have.value','8')
        cy.get('#years').should('have.value','1979')
    
        cy.get('#newsletter').should('be.checked').and('have.value', '1')

        //save form
        cy.get('#old_passwd').type(this.user.password)
        cy.get('#passwd').type(this.user.password)
        cy.get('#confirmation').type(this.user.password)
        cy.get(':nth-child(11) > .btn > span').click()
        cy.get('#center_column > div > p').should('have.class','alert alert-success')
        cy.get('.alert').contains('Your personal information has been successfully updated.')
        
        //logout
        cy.get('.logout').click()
     
        cy.url().should('include','?controller=authentication&back=identity')
        cy.title().should('eq','Login - My Store')

        //login
        cy.login(this.user.email, this.user.password)
  
        cy.get('.account > span').should('have.text','Sam smith')
        cy.title().should('eq', 'My account - My Store')


      })


  })
  