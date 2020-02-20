import React, { memo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { Container, Header, Input, Button, Message } from 'semantic-ui-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { AUTHENTICATE_USER } from '../gql/user';

const Login = () => {
    const [errorMsg, setErrorMsg] = useState(null);

    const history = useHistory();
    const navigateRegister = () => {
        history.push('/register');
    };
    const navigateHome = () => {
        history.push('/');
    };

    const [authenticate, { loading: submitting }] = useMutation(AUTHENTICATE_USER, {
        onCompleted: (data) => {
            const { success, token, refreshToken, errors } = data.authenticateUser;
            if (success) {
                localStorage.setItem('token', token);
                localStorage.setItem('refreshToken', refreshToken);
                navigateHome();
            } else {
                setErrorMsg(errors.map(error => error.message));
            }
        },
        onError: (error) => {
            console.log('GraphQl failed');
            console.log(error);
        },
    });

    return (
        <Container text>
            <Header as="h2">Login</Header>
            <Formik
                initialValues={{
                    username: '',
                    email: '',
                    password: '',
                }}
                onSubmit={values => {
                    setErrorMsg(null);
                    authenticate({
                        variables: {
                            email: values.email,
                            password: values.password,
                        },
                    });
                }}
                validate={values => {
                    const errors = {};

                    if (!values.email) {
                        errors.email = 'Please enter email address';
                    }

                    if (!values.password) {
                        errors.password = 'Please enter Password';
                    }

                    return errors;
                }}
            >
                {({ setTouched, touched, isSubmitting, setFieldValue, errors }) => (
                    //values
                    <Form>
                        <Field
                            name="email"
                            type="email"
                            component={Input}
                            onBlur={() => setTouched({ email: true })}
                            onChange={(e) => setFieldValue('email', e.target.value)}
                            placeholder="Email"
                            fluid
                            error={Boolean(errors.email) && touched.email}
                        />
                        <ErrorMessage name="email" component="span" />
                        <br />

                        <Field
                            name="password"
                            type="password"
                            component={Input}
                            onBlur={() => setTouched({ password: true })}
                            onChange={(e) => setFieldValue('password', e.target.value)}
                            placeholder="Password"
                            fluid
                            error={Boolean(errors.password) && touched.password}
                        />
                        <ErrorMessage name="password" component="span" />
                        <br />

                        {errorMsg && (
                            <Message error list={errorMsg} />
                        )}

                        <div>
                            <Button type="submit" disabled={isSubmitting}>Login</Button>
                            <Button primary onClick={navigateRegister}>Sign Up</Button>
                        </div>

                        {submitting && (
                            // <LoadingSpinner
                            //     loading={submitting}
                            // />
                            <span>sending data...</span>
                        )}
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

export default memo(Login);
