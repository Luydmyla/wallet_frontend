import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { useRegisterMutation } from '../../redux/authOperation';
import { Formik, ErrorMessage, Form } from 'formik';
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Input,
  InputContainer,
  SvgAccount,
  SvgEnvelope,
  SvgLock,
  RegisterButton,
  LoginButton,
  ErrorText
} from './RegistrationForm.styled';
import { Pass } from './pass';

export const FormRegistration = () => {
  const [register, { isSuccess, isError, error, status }] =
    useRegisterMutation();
  console.log(status);
  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().min(6).required(),
    password: yup.string().matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
      "must be uppercase, number and special character"
    ).min(6).max(12).required(),
    repeated_password: yup.string().when('password', {
      is: val => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf([yup.ref('password')], 'both password need to be the same'),
    }),
  });

  const defaultInitialValues = {
    name: '',
    email: '',
    password: '',
    repeated_password: '',
  };

  const handleSubmit = ({ name, email, password }, { resetForm }) => {
    register({ name, email, password });
    resetForm();
    return;
  };

  const FormError = ({ name }) => {
    return <ErrorMessage name={name} render={message => <ErrorText>{message}</ErrorText>} />;
  };

  return (
    <>
      {status === 'fulfilled' &&
        toast.success('Success! Please, log in!', {
          theme: 'colored',
          icon: '🚀',
          autoClose: 8000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Slide,
        }) && <ToastContainer />}
      {isError && toast.error(error.data.message) && <ToastContainer />}
      <Formik
        initialValues={defaultInitialValues}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        <Form autoComplete="off">
          <InputContainer>
            <SvgEnvelope />
            <Input name="email" type="email" placeholder="E-mail" />
            <FormError name="email" />
          </InputContainer>
          <Pass />
          <InputContainer>
            <SvgLock />
            <Input
              name="repeated_password"
              type="password"
              placeholder="Confirm password"
            />
            <FormError name="repeated_password" />
          </InputContainer>
          <InputContainer>
            <SvgAccount />
            <Input name="name" type="text" placeholder="First name " />
            <FormError name="name" />
          </InputContainer>
          <RegisterButton type="submit"> Register</RegisterButton>
          <ToastContainer />
        </Form>
      </Formik>
      <Link to="/login">
        <LoginButton type="button">Log in</LoginButton>
      </Link>
    </>
  );
};
