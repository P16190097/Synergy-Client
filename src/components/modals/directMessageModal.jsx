import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { Form as SemanticForm, Modal, Button, Dropdown } from 'semantic-ui-react';
import { GET_TEAM_USERS } from '../../gql/user';
//import normalizeErrors from '../../normalizeErrors';

const AddChannelModal = ({ open, onClose, currentTeamId, userId }) => {
    const [userToMessage, setUserToMessage] = useState(null);

    const history = useHistory();
    const navigateToUser = (id) => {
        onClose();
        history.push(`/dm/${currentTeamId}/${id}`);
    };

    const { loading, data } = useQuery(GET_TEAM_USERS, {
        variables: {
            teamId: currentTeamId,
        },
        fetchPolicy: 'network-only',
    });

    if (loading) {
        return null;
    }

    const { getTeamUsers: users } = data;

    return (
        <Modal open={open} onClose={onClose}>
            <Modal.Header>Direct message a user</Modal.Header>
            <Modal.Content>
                <div className="ui form">
                    <SemanticForm>
                        <SemanticForm.Field>
                            <Dropdown
                                fluid
                                placeholder="Enter username here"
                                search
                                selection
                                options={users.filter((user) => parseInt(user.id, 10) !== userId).map((user) => ({
                                    key: user.id,
                                    value: user.id,
                                    text: user.username,
                                }))}
                                onChange={(e, d) => { setUserToMessage(d.value); }}
                            />
                        </SemanticForm.Field>
                        <SemanticForm.Field>
                            <SemanticForm.Group widths="equal">
                                <Button
                                    fluid
                                    onClick={userToMessage ? () => navigateToUser(userToMessage) : null}
                                >
                                    Confirm
                                </Button>
                                <Button fluid onClick={onClose}>
                                    Cancel
                                </Button>
                            </SemanticForm.Group>
                        </SemanticForm.Field>
                    </SemanticForm>
                </div>
            </Modal.Content>
        </Modal>
    );
};

AddChannelModal.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    currentTeamId: PropTypes.number,
    userId: PropTypes.number,
};

AddChannelModal.defaultProps = {
    open: false,
    onClose: () => { },
    currentTeamId: null,
    userId: null,
};

export default AddChannelModal;
