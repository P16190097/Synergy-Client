import React, { memo, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { Container, Header, Input, Button, Message, Form as SemanticForm, Loader } from 'semantic-ui-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { REGISTER_USER } from '../gql/user';

const Register = () => {
    const [errorMsg, setErrorMsg] = useState(null);

    const history = useHistory();
    const navigateLogin = () => {
        history.push('/login');
    };

    const navigateToError = () => {
        history.push('/error');
    };

    const [register, { loading: submitting }] = useMutation(REGISTER_USER, {
        onCompleted: (data) => {
            const { success, errors } = data.registerUser;
            if (success) {
                navigateLogin();
            } else {
                setErrorMsg(errors.map(error => error.message));
            }
        },
        onError: (error) => {
            // TODO: ADD BETTER ERROR HANDLING
            console.log('GraphQl failed');
            console.log(error);
            navigateToError();
        },
    });


    return (
        <Container text>
            <Header as="h2" color="orange">Register Account</Header>
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
                {({ setTouched, touched, isSubmitting, setFieldValue, errors, handleSubmit }) => (
                    //values
                    <Form
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !isSubmitting) {
                                handleSubmit();
                            }
                        }}
                    >
                        <SemanticForm.Field>
                            <Field
                                name="username"
                                component={Input}
                                onBlur={() => setTouched({ username: true })}
                                onChange={(e) => setFieldValue('username', e.target.value)}
                                placeholder="Username"
                                fluid
                                error={Boolean(errors.username && touched.username)}
                                inverted
                                label="Username"
                            />
                            <ErrorMessage name="username">{(msg) => (<Message negative>{msg}</Message>)}</ErrorMessage>
                        </SemanticForm.Field>
                        <br />

                        <SemanticForm.Field>
                            <Field
                                name="email"
                                type="email"
                                component={Input}
                                onBlur={() => setTouched({ email: true })}
                                onChange={(e) => setFieldValue('email', e.target.value)}
                                placeholder="Email"
                                fluid
                                error={Boolean(errors.email && touched.email)}
                                inverted
                                label="Email"
                            />
                            <ErrorMessage name="email">{(msg) => (<Message negative>{msg}</Message>)}</ErrorMessage>
                        </SemanticForm.Field>
                        <br />

                        <SemanticForm.Field>
                            <Field
                                name="password"
                                type="password"
                                component={Input}
                                onBlur={() => setTouched({ password: true })}
                                onChange={(e) => setFieldValue('password', e.target.value)}
                                placeholder="Password"
                                fluid
                                error={Boolean(errors.password && touched.password)}
                                inverted
                                label="Password"
                            />
                            <ErrorMessage name="password">{(msg) => (<Message negative>{msg}</Message>)}</ErrorMessage>
                        </SemanticForm.Field>
                        <br />

                        <SemanticForm.Field>
                            <Field
                                name="confirmPassword"
                                type="password"
                                component={Input}
                                onBlur={() => setTouched({ confirmPassword: true })}
                                onChange={(e) => setFieldValue('confirmPassword', e.target.value)}
                                placeholder="Confirm Password"
                                fluid
                                error={Boolean(errors.confirmPassword && touched.confirmPassword)}
                                inverted
                                label="ConfirmPassword"
                            />
                            <ErrorMessage name="confirmPassword">{(msg) => (<Message negative>{msg}</Message>)}</ErrorMessage>
                        </SemanticForm.Field>
                        <br />

                        {errorMsg && (
                            <Message error header="An Error has occured:" list={errorMsg} />
                        )}

                        <Button type="submit" color="orange" disabled={isSubmitting}>Create Account</Button>
                        <Button color="orange" disabled={isSubmitting} onClick={navigateLogin} className="s-button">Return to login</Button>
                    </Form>
                )}
            </Formik>
            {submitting && (
                // <LoadingSpinner
                //     loading={submitting}
                // />
                <Loader />
            )}
        </Container>
    );
};

export default memo(Register);
