import React, { memo, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { Container, Header, Input, Button, Message, Form as SemanticForm } from 'semantic-ui-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { CREATE_TEAM } from '../gql/team';

const CreateTeam = () => {
    const [errorMsg, setErrorMsg] = useState(null);

    const history = useHistory();
    const navigateLogin = () => {
        history.push('/login');
    };

    const [createTeam, { loading: submitting }] = useMutation(CREATE_TEAM, {
        onCompleted: (data) => {
            const { success, errors } = data.registerUser;
            if (success) {
                navigateLogin();
            } else {
                setErrorMsg(errors.map(error => error.message));
            }
        },
        onError: () => {
            // TODO ERROR HANDLING
        },
    });


    return (
        <Container text>
            <Header as="h2">Create Team</Header>
            <Formik
                initialValues={{
                    username: '',
                    email: '',
                    password: '',
                }}
                onSubmit={values => {
                    setErrorMsg(null);
                    createTeam({
                        variables: {
                            name: values.teamName,
                        },
                    });
                }}
                validate={values => {
                    const errors = {};

                    if (!values.teamName) {
                        errors.teamName = 'Please enter Username';
                    }

                    return errors;
                }}
            >
                {({ setTouched, touched, isSubmitting, setFieldValue, errors }) => (
                    //values
                    <Form>
                        <SemanticForm.Field>
                            <label htmlFor="teamName">Team Name</label>
                            <Field
                                name="teamName"
                                component={Input}
                                onBlur={() => setTouched({ teamName: true })}
                                onChange={(e) => setFieldValue('teamName', e.target.value)}
                                placeholder="Team name here"
                                fluid
                                error={Boolean(errors.teamName && touched.teamName)}
                            />
                            <ErrorMessage name="teamName" component="span" />
                        </SemanticForm.Field>
                        <br />

                        {errorMsg && (
                            <Message error header="An Error has occured:" list={errorMsg} />
                        )}

                        <Button type="submit" disabled={isSubmitting}>Create Team</Button>
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

export default memo(CreateTeam);
