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

    const navigateToTeam = (id) => {
        history.push(`/team/${id}`);
    };

    const [createTeam, { loading: submitting }] = useMutation(CREATE_TEAM, {
        onCompleted: (data) => {
            const { success, errors, team } = data.createTeam;
            if (success) {
                console.log('success');
                navigateToTeam(team.id);
            } else {
                console.log(errorMsg);
                setErrorMsg(errors.map(error => error.message));
            }
        },
        onError: (error) => {
            // TODO: ADD BETTER ERROR HANDLING FOR NETWORK ERRORS
            console.log('GraphQl failed');
            console.log(error);
            if (error.message === 'Not Authenticated') {
                navigateLogin();
            }
        },
    });


    return (
        <Container text>
            <Header as="h2" color="orange">Create Team</Header>
            <Formik
                initialValues={{
                    username: '',
                    email: '',
                    password: '',
                }}
                onSubmit={values => {
                    setErrorMsg(null);
                    console.log('sending');
                    createTeam({
                        variables: {
                            teamName: values.teamName,
                        },
                    });
                }}
                validate={values => {
                    const errors = {};

                    if (!values.teamName) {
                        errors.teamName = 'Please enter a team name';
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
