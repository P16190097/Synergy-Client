import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import { Form as SemanticForm, Modal, Input, Button, Message, Loader } from 'semantic-ui-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { CREATE_CHANNEL } from '../../gql/channels';
import { GET_USER } from '../../gql/user';

const AddChannelModal = ({ open, onClose, currentTeamId }) => {
    const [errorMsg, setErrorMsg] = useState(null);

    const [createNewChannel, { loading: submitting }] = useMutation(CREATE_CHANNEL, {
        onCompleted: (data) => {
            const { success, errors } = data.createChannel;
            if (success) {
                console.log('success');
                onClose();
            } else {
                console.log(errors);
                setErrorMsg(errors.map(error => error.message));
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
            <Modal.Header>Add Channel</Modal.Header>
            <Modal.Content>
                <div className="ui form">
                    <Formik
                        initialValues={{
                            channelName: '',
                        }}
                        onSubmit={values => {
                            setErrorMsg(null);
                            createNewChannel({
                                variables: {
                                    channelName: values.channelName,
                                    teamId: currentTeamId,
                                },
                                update: (proxy, { data: { createChannel } }) => {
                                    const { channel, success } = createChannel;
                                    if (success) {
                                        // Read the data from our cache for this query.
                                        const data = proxy.readQuery({ query: GET_USER });
                                        // Write our data back to the cache with the new channel in it
                                        const teamIndex = data.getUser.teams.findIndex(x => x.id === currentTeamId);
                                        data.getUser.teams[teamIndex].channels.push(channel);
                                        proxy.writeQuery({
                                            query: GET_USER,
                                            data,
                                        });
                                    }
                                },
                            });
                        }}
                        validate={values => {
                            const errors = {};

                            if (!values.channelName) {
                                errors.channelName = 'Channel must have a name!';
                            } else if (values.channelName.length > 20) {
                                errors.teamName = 'Channel Name must be less than 20 characters';
                            }

                            return errors;
                        }}
                    >
                        {({ touched, isSubmitting, setFieldValue, errors, handleSubmit }) => (
                            <Form
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !isSubmitting) {
                                        handleSubmit();
                                    }
                                }}
                            >

                                <SemanticForm.Field>
                                    <Field
                                        name="channelName"
                                        type="text"
                                        component={Input}
                                        onChange={(e) => setFieldValue('channelName', e.target.value)}
                                        error={Boolean(errors.email) && touched.email}
                                        fluid
                                        placeholder="Channel name"
                                    />
                                    <ErrorMessage name="channelName">{(msg) => (<Message negative>{msg}</Message>)}</ErrorMessage>
                                </SemanticForm.Field>
                                <SemanticForm.Field>
                                    <SemanticForm.Group widths="equal">
                                        <Button
                                            fluid
                                            type="submit"
                                            disabled={isSubmitting}
                                        >
                                            Create Channel
                                        </Button>
                                        <Button fluid onClick={onClose}>
                                            Cancel
                                        </Button>
                                    </SemanticForm.Group>
                                </SemanticForm.Field>
                                {errorMsg && (
                                    <Message error header="An Error has occured:" list={errorMsg} />
                                )}
                                {submitting && (
                                    // <LoadingSpinner
                                    //     loading={submitting}
                                    // />
                                    <Loader />
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
    currentTeamId: 0,
};

export default AddChannelModal;
