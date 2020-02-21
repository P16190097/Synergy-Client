import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import { Form as SemanticForm, Modal, Input, Button, Message } from 'semantic-ui-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { CREATE_CHANNEL } from '../../gql/channels';

const AddChannelModal = ({ open, onClose, currentTeamId }) => {
    const [errorMsg, setErrorMsg] = useState(null);

    const [createChannel, { loading: submitting }] = useMutation(CREATE_CHANNEL, {
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
                <SemanticForm>
                    <Formik
                        initialValues={{
                            channelName: '',
                        }}
                        onSubmit={values => {
                            setErrorMsg(null);
                            createChannel({
                                variables: {
                                    channelName: values.channelName,
                                    teamId: currentTeamId,
                                },
                            });
                        }}
                        validate={values => {
                            const errors = {};

                            if (!values.channelName) {
                                errors.channelName = 'Channel must have a name!';
                            }

                            return errors;
                        }}
                    >
                        {({ touched, isSubmitting, setFieldValue, errors }) => (
                            <Form>

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
                                    <ErrorMessage name="channelName" component="span" />
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
                                    <Message error list={errorMsg} />
                                )}
                                {submitting && (
                                    // <LoadingSpinner
                                    //     loading={submitting}
                                    // />
                                    <span>sending data...</span>
                                )}

                            </Form>
                        )}
                    </Formik>
                </SemanticForm>
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
