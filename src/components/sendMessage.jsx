import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const SendMessageWrapper = styled.div`
    grid-column: 3;
    grid-row: 4;
    margin: 20px;
`;

const SendMessage = ({ header, onSubmit }) => {
    return (
        <SendMessageWrapper>
            <Formik
                initialValues={{
                    message: '',
                }}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                    //setErrorMsg(null);
                    setSubmitting(true);
                    if (!values.message || !values.message.trim()) {
                        setSubmitting(false);
                        return;
                    }

                    await onSubmit(values.message.slice(0, 255))
                        .then(() => {
                            setSubmitting(false);
                            resetForm();
                        });
                }}
            >
                {({ touched, isSubmitting, setFieldValue, errors, handleSubmit, values }) => (
                    <Form
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !isSubmitting) {
                                handleSubmit();
                            }
                        }}
                    >
                        <Field
                            name="message"
                            type="text"
                            component={Input}
                            onChange={(e) => setFieldValue('message', e.target.value)}
                            value={values.message}
                            error={errors.email && touched.email}
                            fluid
                            placeholder={`# ${header}`}
                            action={{
                                type: 'submit',
                                content: 'Send',
                                color: 'orange',
                            }}
                        />
                        <ErrorMessage name="email" component="span" />
                    </Form>
                )}
            </Formik>
        </SendMessageWrapper>
    );
};

SendMessage.propTypes = {
    header: PropTypes.string,
    onSubmit: PropTypes.func,
};

SendMessage.defaultProps = {
    header: '',
    onSubmit: () => { },
};

export default SendMessage;
