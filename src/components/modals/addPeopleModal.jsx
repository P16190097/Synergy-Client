import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import { Form as SemanticForm, Modal, Input, Button } from 'semantic-ui-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ADD_USER_TO_TEAM } from '../../gql/team';
//import normalizeErrors from '../../normalizeErrors';

const AddChannelModal = ({ open, onClose, currentTeamId }) => {
    const [errorMsg, setErrorMsg] = useState(null);

    const [addTeamMember, { loading: submitting }] = useMutation(ADD_USER_TO_TEAM, {
        onCompleted: (data) => {
            const { success, errors } = data.addTeamMember;
            if (success) {
                onClose();
            } else {
                const errorlist = errors.map(error => error.message);
                console.log(errorlist);
                setErrorMsg(errorlist);
            }
        },
        onError: (error) => {
            console.log('GraphQl failed');
            console.log(error);
            setErrorMsg(['An error has occured']);
        },
    });

    return (
        <Modal open={open} onClose={onClose}>
            <Modal.Header>Add User to your team</Modal.Header>
            <Modal.Content>
                <div className="ui form">
                    <Formik
                        initialValues={{
                            channelName: '',
                        }}
                        onSubmit={values => {
                            setErrorMsg(null);
                            addTeamMember({
                                variables: {
                                    email: values.email,
                                    teamId: currentTeamId,
                                },
                                // update: (proxy, { data: { addTeamMember } }) => {
                                //     const { channel, success } = createChannel;
                                //     if (success) {
                                //         // Read the data from our cache for this query.
                                //         const data = proxy.readQuery({ query: ALL_TEAMS });
                                //         // Write our data back to the cache with the new comment in it
                                //         const teamIndex = data.allTeams.findIndex(x => x.id === currentTeamId);
                                //         data.allTeams[teamIndex].channels.push(channel);
                                //         proxy.writeQuery({
                                //             query: ALL_TEAMS,
                                //             data,
                                //         });
                                //     }
                                // },
                            });
                        }}
                        validate={values => {
                            const errors = {};

                            if (!values.email) {
                                errors.email = 'Please enter email of user to add to team!';
                            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
                                errors.email = 'Please enter a valid email address';
                            }

                            return errors;
                        }}
                    >
                        {({ touched, isSubmitting, setFieldValue, errors }) => (
                            <Form>
                                <SemanticForm.Field>
                                    <Field
                                        name="email"
                                        type="text"
                                        component={Input}
                                        onChange={(e) => setFieldValue('email', e.target.value)}
                                        error={Boolean(errors.email) && touched.email}
                                        fluid
                                        placeholder="User Email"
                                    />
                                    <ErrorMessage name="email" component="span" />
                                </SemanticForm.Field>
                                {errorMsg && errorMsg[0]}
                                {/* {errorMsg && (
                                    <Message error header="An Error has occured:" list={errorMsg} />
                                )} */}
                                <SemanticForm.Field>
                                    <SemanticForm.Group widths="equal">
                                        <Button
                                            fluid
                                            type="submit"
                                            disabled={isSubmitting}
                                        >
                                            Add User
                                        </Button>
                                        <Button fluid onClick={onClose}>
                                            Cancel
                                        </Button>
                                    </SemanticForm.Group>
                                </SemanticForm.Field>
                                {submitting && (
                                    // <LoadingSpinner
                                    //     loading={submitting}
                                    // />
                                    <span>sending data...</span>
                                )}
                            </Form>
                        )}
                    </Formik>
                </div>
            </Modal.Content>
        </Modal>
    );
};

AddChannelModal.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    currentTeamId: PropTypes.number,
};

AddChannelModal.defaultProps = {
    open: false,
    onClose: () => { },
    currentTeamId: null,
};

export default AddChannelModal;
