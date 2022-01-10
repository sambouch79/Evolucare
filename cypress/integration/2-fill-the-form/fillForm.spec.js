/// <reference types="cypress" />


describe('creat account', () => {
     beforeEach(() => {
        cy.visit('/?controller=authentication&back=my-account')
        //tape email
        cy.get('#email_create').type('sambouch198@gmail.com')
        // Click sign in button
        cy.get('#SubmitCreate').click()
        cy.wait(4000)
    }) 
 

 it('invalid email', () => {
    //clear and tape tape invalid email
    cy.get('input[name=email]').first().clear().type('hjkjkjhkjh')
    // Click another(password) input 
    cy.get('input[name=passwd]').click()
    
    //make assertion that input become red 
    const error='#account-creation_form > div:nth-child(1) > div:nth-child(5)'
    cy.get(error).should('have.class','form-error')
  })
  it('valid email', () => {
   
    //tape valid email
    cy.get('input[name=email]').first().clear().type('sambouch198@gmail.com')
  // Click another(password) input 
    cy.get('input[name=passwd]').click()
     //make assertion that input become green
    const error='#account-creation_form > div:nth-child(1) > div:nth-child(5)'
    cy.get(error).should('have.class','form-ok')
  })

  it('fill all the form fields except one', () => {
    //choise civility ( Check checkbox element)
    cy.get('[type="radio"]').check('2') 

    //tape firstname
    cy.get('#customer_firstname').type('sam')
     //tape lastname
     cy.get('#customer_lastname').type('smith')


    //tape valid email
    cy.get('input[name=email]').first().clear().type('sambouch198@gmail.com')
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
    
  })

})