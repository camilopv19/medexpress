import React, {Component} from 'react';  

/* Import Components */
import CheckBox from '../components/CheckBox';  
import Input from '../components/Input';  
import TextArea from '../components/TextArea';  
import Select from '../components/Select';
import Button from '../components/Button'

class FormContainer extends Component {  
  constructor(props) {
    super(props);

    this.state = {
      newUser: {
        name: '',
        age: '',
        gender: '',
        payOps: [],
        about: ''

      },

      genderOptions: ['Masculino', 'Femenino', 'Otro'],
      payOptions: ['Transferencia a cuenta de ahorros', 'Crédito a 15 días', 'De contado']

    }
    this.handleTextArea = this.handleTextArea.bind(this);
    this.handleAge = this.handleAge.bind(this);
    this.handleFullName = this.handleFullName.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  /* This lifecycle hook gets executed when the component mounts */
  
  handleFullName(e) {
   let value = e.target.value;
   this.setState( prevState => ({ newUser : 
        {...prevState.newUser, name: value
        }
      }), () => console.log(this.state.newUser))
  }

  handleAge(e) {
       let value = e.target.value;
   this.setState( prevState => ({ newUser : 
        {...prevState.newUser, age: value
        }
      }), () => console.log(this.state.newUser))
  }

  handleInput(e) {
       let value = e.target.value;
       let name = e.target.name;
   this.setState( prevState => ({ newUser : 
        {...prevState.newUser, [name]: value
        }
      }), () => console.log(this.state.newUser))
  }

  handleTextArea(e) {
    console.log("Inside handleTextArea");
    let value = e.target.value;
    this.setState(prevState => ({
      newUser: {
        ...prevState.newUser, about: value
      }
      }), ()=>console.log(this.state.newUser))
  }


  handleCheckBox(e) {

    const newSelection = e.target.value;
    let newSelectionArray;

    if(this.state.newUser.payOps.indexOf(newSelection) > -1) {
      newSelectionArray = this.state.newUser.payOps.filter(s => s !== newSelection)
    } else {
      newSelectionArray = [...this.state.newUser.payOps, newSelection];
    }

      this.setState( prevState => ({ newUser:
        {...prevState.newUser, payOps: newSelectionArray }
      })
      )
}

  handleFormSubmit(e) {
    e.preventDefault();
    let userData = this.state.newUser;
    
    fetch('http://example.com',{
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(response => {
        response.json().then(data =>{
          console.log("Successful" + data);
        })
    })
  }   

  handleClearForm(e) {
  
      e.preventDefault();
      this.setState({ 
        newUser: {
          name: '',
          age: '',
          gender: '',
          payOps: [],
          about: ''
        },
      })
  }

  render() {
    return (
    
        <form className="container-fluid" onSubmit={this.handleFormSubmit}>
       
            <Input inputType={'text'}
                   title= {'Nombre completo'} 
                   name= {'name'}
                   value={this.state.newUser.name} 
                   placeholder = {'Ingrese su nombre'}
                   handleChange = {this.handleInput}
                   
                   /> {/* Name of the user */}
        
          <Input inputType={'number'} 
                name={'age'}
                 title= {'Edad'} 
                 value={this.state.newUser.age} 
                placeholder = {'Ingrese su edad'}
                 handleChange={this.handleAge} /> {/* Age */} 


          <Select title={'Género'}
                  name={'gender'}
                  options = {this.state.genderOptions} 
                  value = {this.state.newUser.gender}
                  placeholder = {'Seleccione su género'}
                  handleChange = {this.handleInput}
                  /> {/* Age Selection */}
          <CheckBox  title={'Método de pago'}
                  name={'payOps'}
                  options={this.state.payOptions}
                  selectedOptions = { this.state.newUser.payOps}
                  handleChange={this.handleCheckBox}
                   /> {/* Skill */}
          <TextArea
            title={'Cuéntanos sobre tu necesidad'}
            rows={10}
            value={this.state.newUser.about}
            name={'currentPetInfo'}
            handleChange={this.handleTextArea}
            placeholder={'Describe por favor los detalles del servicio que deseas'} />{/* About you */}

          <Button 
            action = {this.handleClearForm}
            type = {'secondary'}
            title = {'Volver'}
            style={buttonStyle}
          /> {/* Clear the form */}

          <Button 
              action = {this.handleFormSubmit}
              type = {'primary'} 
              title = {'Confirmar'} 
            style={buttonStyle}
          /> { /*Submit */ }
          
          <Button 
            action = {this.handleClearForm}
            type = {'secondary'}
            title = {'Limpiar'}
            style={buttonStyle}
          /> {/* Clear the form */}
          
        </form>
  
    );
  }
}

const buttonStyle = {
  margin : '10px 10px 10px 10px'
}

export default FormContainer;