import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {loginAsync} from '../../store/authSlice';
import {Button, Inputs} from 'adminlte-2-react';
import ReeValidate from 'ree-validate';

const validator = new ReeValidate({
  username: 'required|email',
  password: 'required',
});

function Login() {
  const {Text} = Inputs;

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [setFormErrors] = useState(validator.errors);

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const {errors} = validator;

    setFormData({...formData, [name]: value});

    errors.remove(name);

    validator.validate(name, value)
      .then(() => {
        setFormErrors(errors);
      })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {errors} = validator;

    validator.validateAll(formData)
      .then((success) => {
        if (success) {
          submit();
        } else {
          setFormErrors(errors);
        }
      })
  };

  const submit = () => {
    dispatch(loginAsync(formData))
      .catch(({error, statusCode}) => {
        console.log(error, statusCode);
      })
  };

  return (
    <React.Fragment>
      <Text inputType="email"
            name="username"
            id="emailInput"
            labelPosition="none"
            placeholder="Email"
            iconRight="fa-envelope"
            onChange={handleOnChange}
      />
      <Text inputType="password"
            name="password"
            id="passwordInput"
            labelPosition="none"
            placeholder="Password"
            iconRight="fa-lock"
            onChange={handleOnChange}
      />
      <Button type="primary"
              id="loginButton"
              text="Submit"
              color="primary"
              flat={true}
              pullRight={true}
              onClick={handleSubmit}/>
    </React.Fragment>
  );
}

export default Login;
