import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { Container, Header, Input, TextArea, Button, Message, Form as SemanticForm, Dimmer, Loader } from 'semantic-ui-react';
import { Formik, Field, ErrorMessage } from 'formik';
import { EDIT_TEAM, GET_TEAM_FOR_EDIT } from '../gql/team';

const EditTeam = ({ match: { params: { teamId } } }) => {
    const [errorMsg, setErrorMsg] = useState(null);

    const teamIdInt = parseInt(teamId, 10);

    const history = useHistory();

    const navigateToTeam = (id) => {
        history.push(`/team/${id}`);
    };

    const navigateToError = () => {
        history.push('/error');
    };

    const [editTeam, { loading: submitting }] = useMutation(EDIT_TEAM, {
        onCompleted: (d) => {
            const { success, errors } = d.editTeam;
            if (success) {
                console.log('success');
                navigateToTeam(teamIdInt);
            } else {
                console.log(errorMsg);
                setErrorMsg(errors.map(er => er.message));
            }
        },
        onError: (err) => {
            // TODO: ADD BETTER ERROR HANDLING FOR NETWORK ERRORS
            console.log('GraphQl failed');
            console.log(err);
            navigateToError();
        },
    });

    const { loading, error, data } = useQuery(GET_TEAM_FOR_EDIT, {
        variables: {
            teamId: teamIdInt,
        },
        fetchPolicy: 'network-only',
    });

    if (loading) {
        return (
            <Dimmer active>
                <Loader />
            </Dimmer>
        );
    }

    if (error || !data) {
        navigateToError();
    }

    const { getTeam: team } = data;

    return (
        <Container text>
            <Header as="h2" color="orange">Edit Team</Header>
            <Formik
                initialValues={{
                    teamName: team.name,
                    description: team.description,
                }}
                onSubmit={values => {
                    setErrorMsg(null);
                    console.log('sending');
                    editTeam({
                        variables: {
                            teamId: teamIdInt,
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
                {({ setTouched, touched, isSubmitting, setFieldValue, errors, handleSubmit, values }) => (
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
                                value={values.teamName}
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
                                value={values.description}
                                rows={3}
                                label="Description"
                            />
                            <ErrorMessage name="description">{(msg) => (<Message negative>{msg}</Message>)}</ErrorMessage>
                        </SemanticForm.Field>
                        <br />

                        {errorMsg && (
                            <Message error header="An Error has occured:" list={errorMsg} />
                        )}

                        <Button type="submit" color="orange" disabled={isSubmitting} onClick={() => handleSubmit()}>Confirm</Button>
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
    );
};

EditTeam.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    match: PropTypes.object,
};

EditTeam.defaultProps = {
    match: {},
};

export default memo(EditTeam);
