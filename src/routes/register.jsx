import React, { memo, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { Container, Header, Input, Button, Message } from 'semantic-ui-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { REGISTER_USER } from '../gql/user';

const Register = () => {
    const [errorMsg, setErrorMsg] = useState(null);

    const history = useHistory();
    const navigateHome = () => {
        history.push('/');
    };

    const [register, { loading: submitting }] = useMutation(REGISTER_USER, {
        onError: (error) => {
            setErrorMsg(error.message.replace('GraphQL error: ', ''));
            console.log(error.message);
        },
        onCompleted: () => navigateHome(),
    });


    return (
        <Container text>
            <Header as="h2">Register Account</Header>
            <Formik
                initialValues={{
                    username: '',
                    email: '',
                    password: '',
                }}
                onSubmit={values => {
                    setErrorMsg(null);
                    register({
                        variables: {
                            username: values.username,
                            email: values.email,
                            password: values.password,
                        },
                    });
                }}
                validate={values => {
                    const errors = {};

                    if (values.password !== values.confirmPassword) {
                        errors.confirmPassword = 'Passwords do not match!';
                    }

                    if (!values.email) {
                        errors.email = 'Please enter email address';
                    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
                        errors.email = 'Invalid email address';
                    }

                    // if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                    //     errors.email = 'Invalid email address';
                    // }

                    if (!values.username) {
                        errors.username = 'Please enter Username';
                    }

                    if (!values.password) {
                        errors.password = 'Please enter Password';
                    }

                    if (!values.confirmPassword) {
                        errors.confirmPassword = 'Please confirm password';
                    }

                    return errors;
                }}
            >
                {({ setTouched, isSubmitting, setFieldValue, errors }) => (
                    //values
                    <Form>
                        <Field
                            name="username"
                            component={Input}
                            onBlur={() => setTouched({ username: true })}
                            onChange={(e) => setFieldValue('username', e.target.value)}
                            placeholder="Username"
                            fluid
                            error={Boolean(errors.username)}
                        />
                        <ErrorMessage name="username" component="span" />
                        <br />

                        <Field
                            name="email"
                            type="email"
                            component={Input}
                            onBlur={() => setTouched({ email: true })}
                            onChange={(e) => setFieldValue('email', e.target.value)}
                            placeholder="Email"
                            fluid
                            error={Boolean(errors.email)}
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
                            error={Boolean(errors.password)}
                        />
                        <ErrorMessage name="password" component="span" />
                        <br />

                        <Field
                            name="confirmPassword"
                            type="password"
                            component={Input}
                            onBlur={() => setTouched({ confirmPassword: true })}
                            onChange={(e) => setFieldValue('confirmPassword', e.target.value)}
                            placeholder="Confirm Password"
                            fluid
                            error={Boolean(errors.confirmPassword)}
                        />
                        <ErrorMessage name="confirmPassword" component="span" />
                        <br />

                        {errorMsg && (
                            <Message error>{errorMsg}</Message>
                        )}

                        <Button type="submit" disabled={isSubmitting}>Submit</Button>
                    </Form>
                )}
            </Formik>
            {submitting && (
                // <LoadingSpinner
                //     loading={submitting}
                // />
                <span>sending data...</span>
            )}
        </Container>
    );
};

export default memo(Register);
