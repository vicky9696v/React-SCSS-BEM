import {Component} from "react"

import '../App.scss';

class Register extends Component {
    state = {
      
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      phone: '',
      emailText: '',
      passwordText: '',
      confirmPasswordText: '',
      nameText: '',
      phoneText: '',  
      agreementCheckbox: false,
      errors : {
           }
  }
  
    onFieldInput = e => {
      
      this.setState({[e.target.id]:e.target.value})
    
    }
    onCheckBoxInput = e =>{
      this.setState({[e.target.id]:e.target.checked})
    }
  
    onSubmitForm = e => {
      e.preventDefault()
    
      if (this.validateForm()) {
          let fields = {};
          fields["username"] = "";
          fields["emailid"] = "";
          fields["mobileno"] = "";
          fields["password"] = "";
          fields['phone'] ='';
          this.setState({fields:fields});
          this.props.onFormSubmit()
          window.location.href = '/graph'  
      }  
    }
    validateForm() {
  
      let fields = this.state;
      let errors = {};
      let formIsValid = true;
  
      if (!fields["fullName"]) {
        formIsValid = false;
        errors["fullName"] = "*Please enter your fullName.";
      }
  
      if (typeof fields["fullName"] !== "undefined") {
        if (!fields["fullName"].match(/^[a-zA-Z ]*$/)) {
          formIsValid = false;
          errors["fullName"] = "*Please enter alphabet characters only.";
        }
      }
  
      if (!fields["email"]) {
        formIsValid = false;
        errors["email"] = "*Please enter your email-ID.";
      }
  
      if (typeof fields["email"] !== "undefined") {
        //regular expression for email validation
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(fields["email"])) {
          formIsValid = false;
          errors["email"] = "*Please enter valid email-ID.";
        }
      }
  
      if (!fields["phone"]) {
        formIsValid = false;
        errors["phone"] = "*Please enter your mobile no.";
      }
  
      if (typeof fields["phone"] !== "undefined") {
        if (!fields["phone"].match(/^[0-9]{10}$/)) {
          formIsValid = false;
          errors["phone"] = "*Please enter valid mobile no.";
        }
      }
  
      if (!fields["password"]) {
        formIsValid = false;
        errors["password"] = "*Please enter your password.";
      }
  
      if (typeof fields["password"] !== "undefined") {
        if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
          formIsValid = false;
          errors["password"] = "*Please enter secure and strong password.";
        }
      }
      if (fields["password"].length > 0 && fields["password"] !== fields["confirmPassword"]) {
        formIsValid = false;
        errors["password"] = "*password and confirm password should match.";
      }
      // alert(fields["agreementCheckbox"])
      if (fields["agreementCheckbox"]===false) {
        formIsValid = false;
        errors["agreementCheckbox"] = "please check this checkbox to proceed";
      }
  
  
      this.setState({
        errors: errors
      });
  
      return formIsValid;
  
    }
    componentDidMount(){
      this.props.onFormSubmit()
    }
    
    
  
    render() {
      const {email, password, confirmPassword, fullName, phone, errors, agreementCheckbox} = this.state
  
      return (     
        <div className="Main">
          <div className="Main__image">
            <img src="https://www.linkpicture.com/q/Screenshot-2022-05-15-112929.png"
            alt="graph" className="image-class" />
            <div>
            <h1 className="Main__image__heading">Choose a date range</h1>
            <p className="Main__image__para">Lorem ipsum dolor amet, consectetur ,<br />
            adipiscing elit. Mauris imperdiret bibendum.</p>
            </div>
            
          </div>
          <div>
          
          <form className="Main__form" onSubmit={this.onSubmitForm}>
          <h1>Create an account</h1>
            <label className="Main__form__label" htmlFor="id">
              Your email address
             
            </label>
            <input  className="Main__form__input"
            type="text" id="email" 
            value={email}
            onChange={this.onFieldInput} />
             {errors.email ? <p className='Main__form__showError'>{errors.email}</p>: ""}
              <label  className="Main__form__label" htmlFor="password">
              Your Password
            </label>
            <input 
            className="Main__form__input"
            value={password}
            id="password" 
            type="password" 
            onChange={this.onFieldInput}
            />
             {errors.password ? <p className='Main__form__showError'>{errors.password}</p>: ""}
              <label className="Main__form__label" htmlFor="confirm">
              Confirm your password
            </label>
  
            <input 
            
            className="Main__form__input"
            value={confirmPassword}
            type="password" id="confirmPassword"
            onChange={this.onFieldInput} />
             {errors.confirmPassword ? <p className='Main__form__showError'>{errors.confirmPassword}</p>: ""}
              <label className="Main__form__label" htmlFor="name">
              Your full name
            </label>
            <input 
             className="Main__form__input"
            type="text" id="fullName"
            value={fullName}
            onChange={this.onFieldInput} />
            {errors.fullName ? <p className='Main__form__showError'>{errors.fullName}</p>: ""}
              <label className="Main__form__label" htmlFor="phone">
              Your phone number
            </label>
            <input 
             className="Main__form__input--number"
            type="number" id="phone" 
            value={phone}
            onChange={this.onFieldInput}/>
             {errors.phone ? <p className='Main__form__showError'>{errors.phone}</p>: ""}
            <div> 
            <input 
             className="Main__form__checkbox" checked={agreementCheckbox}  onChange={this.onCheckBoxInput} type="checkbox" id="agreementCheckbox" /> 
            <label htmlFor="agreementCheckbox" 
            className="Main__form__checkboxLabel"
           >
            I read and agree Terms and Conditions
              </label>   
              {errors.agreementCheckbox ? <p className='Main__form__showError'>{errors.agreementCheckbox}</p>: ""}
            </div>
            
            <button type="submit" className="Main__form__button">Create account</button>
         
          </form>
          </div> 
        </div>
      )
    }
  }
  export default Register;
  