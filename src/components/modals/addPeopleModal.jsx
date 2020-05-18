import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import { Form as SemanticForm, Modal, Input, Button, Loader, Message } from 'semantic-ui-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ADD_USER_TO_TEAM } from '../../gql/team';
//import normalizeErrors from '../../normalizeErrors';

const AddUserModal = ({ open, onClose, currentTeamId }) => {
    const [errorMsg, setErrorMsg] = useState(null);

    const [addMember, { loading: submitting }] = useMutation(ADD_USER_TO_TEAM, {
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
                            addMember({
                                variables: {
                                    email: values.email,
                                    teamId: currentTeamId,
                                },
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
                                        name="email"
                                        type="text"
                                        component={Input}
                                        onChange={(e) => setFieldValue('email', e.target.value)}
                                        error={errors.email && touched.email}
                                        fluid
                                        placeholder="User Email"
                                    />
                                    <ErrorMessage name="email">{(msg) => (<Message negative>{msg}</Message>)}</ErrorMessage>
                                </SemanticForm.Field>
                                {/* {errorMsg && errorMsg[0]} */}
                                {errorMsg && (
                                    <Message error header="An Error has occured:" list={errorMsg} />
                                )}
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

AddUserModal.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    currentTeamId: PropTypes.number,
};

AddUserModal.defaultProps = {
    open: false,
    onClose: () => { },
    currentTeamId: null,
};

export default AddUserModal;
