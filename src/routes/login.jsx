import React, { memo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { Container, Header, Button, Message, Form as SemanticForm, Divider, Grid, Segment } from 'semantic-ui-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { AUTHENTICATE_USER } from '../gql/user';

const Login = () => {
    const [errorMsg, setErrorMsg] = useState(null);

    const history = useHistory();
    const navigateRegister = () => {
        history.push('/register');
    };
    const navigateHome = () => {
        history.push('/team/');
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
            <Header as="h2" color="orange">Login</Header>
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
                {({ setTouched, touched, isSubmitting, setFieldValue, errors, handleSubmit }) => (
                    <Segment placeholder inverted loading={isSubmitting}>
                        <Grid columns={2} relaxed="very" stackable>
                            <Grid.Column>
                                <Form
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !isSubmitting) {
                                            handleSubmit();
                                        }
                                    }}
                                >
                                    <Field
                                        name="email"
                                        type="email"
                                        component={SemanticForm.Input}
                                        onBlur={() => setTouched({ email: true })}
                                        onChange={(e) => setFieldValue('email', e.target.value)}
                                        placeholder="Email"
                                        error={Boolean(errors.email) && touched.email}
                                        icon="user"
                                        iconPosition="left"
                                        label="Email"
                                        fluid
                                    />
                                    <ErrorMessage name="email" component="div" className="login-error" />
                                    <br />

                                    <Field
                                        name="password"
                                        type="password"
                                        component={SemanticForm.Input}
                                        onBlur={() => setTouched({ password: true })}
                                        onChange={(e) => setFieldValue('password', e.target.value)}
                                        placeholder="Password"
                                        error={Boolean(errors.password) && touched.password}
                                        icon="lock"
                                        iconPosition="left"
                                        label="Password"
                                        fluid
                                    />
                                    <ErrorMessage name="password" component="div" className="login-error" />
                                    <br />

                                    {errorMsg && (
                                        <Message error list={errorMsg} />
                                    )}

                                    <Button type="submit" disabled={isSubmitting} color="orange">Login</Button>

                                    {submitting && (
                                        // <LoadingSpinner
                                        //     loading={submitting}
                                        // />
                                        <span>sending data...</span>
                                    )}
                                </Form>
                            </Grid.Column>

                            <Grid.Column verticalAlign="middle">
                                <Button content="Sign up" icon="signup" size="big" onClick={navigateRegister} />
                            </Grid.Column>
                        </Grid>

                        <Divider vertical inverted>Or</Divider>
                    </Segment>
                )}
            </Formik>
        </Container>
    );
};

export default memo(Login);
