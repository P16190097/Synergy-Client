import React, { memo, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { Container, Header, Input, Button, Message, Form as SemanticForm, TextArea } from 'semantic-ui-react';
import { Formik, Field, ErrorMessage } from 'formik';
import { CREATE_TEAM } from '../gql/team';
import Navbar from '../components/navbar';

const CreateTeam = () => {
    const [errorMsg, setErrorMsg] = useState(null);

    const history = useHistory();
    const navigateLogin = () => {
        history.push('/login');
    };

    const navigateToTeam = (id) => {
        history.push(`/team/${id}`);
    };

    const navigateToError = () => {
        history.push('/error');
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
                return;
            }
            navigateToError();
        },
    });


    return (
        <>
            <Navbar />
            <Container text>
                <Header as="h2" color="orange">Create Team</Header>
                <Formik
                    initialValues={{
                        username: '',
                        description: '',
                    }}
                    onSubmit={values => {
                        setErrorMsg(null);
                        console.log('sending');
                        createTeam({
                            variables: {
                                teamName: values.teamName,
                                description: values.description,
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
                        <SemanticForm
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !isSubmitting) {
                                    handleSubmit();
                                }
                            }}
                        >
                            <SemanticForm.Field>
                                <Field
                                    name="teamName"
                                    component={Input}
                                    onBlur={() => setTouched({ teamName: true })}
                                    onChange={(e) => setFieldValue('teamName', e.target.value)}
                                    placeholder="Team name here"
                                    fluid
                                    error={Boolean(errors.teamName && touched.teamName)}
                                    label="Team Name"
                                />
                                <ErrorMessage name="teamName">{(msg) => (<Message negative>{msg}</Message>)}</ErrorMessage>
                            </SemanticForm.Field>
                            <br />

                            <SemanticForm.Field>
                                <Field
                                    name="description"
                                    component={TextArea}
                                    onBlur={() => setTouched({ description: true })}
                                    onChange={(e) => setFieldValue('description', e.target.value)}
                                    placeholder="Team description here"
                                    rows={3}
                                    label="Description"
                                />
                                <ErrorMessage name="description">{(msg) => (<Message negative>{msg}</Message>)}</ErrorMessage>
                            </SemanticForm.Field>
                            <br />

                            {errorMsg && (
                                <Message error header="An Error has occured:" list={errorMsg} />
                            )}

                            <Button type="submit" color="orange" disabled={isSubmitting} onClick={() => handleSubmit()}>Create Team</Button>
                        </SemanticForm>
                    )}
                </Formik>
                {submitting && (
                    // <LoadingSpinner
                    //     loading={submitting}
                    // />
                    <span>sending data...</span>
                )}
            </Container>
        </>
    );
};

export default memo(CreateTeam);
