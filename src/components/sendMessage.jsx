import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import { Input } from 'semantic-ui-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { SEND_MESSAGE } from '../gql/messages';

const SendMessageWrapper = styled.div`
    grid-column: 3;
    grid-row: 3;
    margin: 20px;
`;

const SendMessage = ({ channelName, channelId }) => {
    const [createMessage] = useMutation(SEND_MESSAGE, {
        onCompleted: (data) => {
            const { success, errors } = data.createMessage;
            if (!success) {
                console.log(errors);
            }
        },
        onError: (error) => {
            console.log('GraphQl failed');
            console.log(error);
        },
    });

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

                    await createMessage({ variables: { message: values.message.slice(0, 255), channelId: parseInt(channelId, 10) } })
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
                            placeholder={`# ${channelName}`}
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
    channelName: PropTypes.string,
    channelId: PropTypes.number,
};

SendMessage.defaultProps = {
    channelName: '',
    channelId: null,
};

export default SendMessage;
