import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@material-ui/core';
import { observer, inject } from 'mobx-react'

const GeneralPopup = inject('MessagesStore', 'UserStore')(observer((props) =>  {

    const { MessagesStore, UserStore } = props;
    const conversation = MessagesStore.userCons ? MessagesStore.userCons.find(d => d._id === MessagesStore.currentConId): null;
    const status = conversation ? conversation.status : null;
    const firstSender = conversation ? conversation.messages[0].senderId : null;
    const partnerFirstName = MessagesStore.currentConId && MessagesStore.userCons[0] ? conversation.users.find(u => u._id !== MessagesStore.userId).firstName : 'your partner';
    const partnerId = MessagesStore.currentConId && MessagesStore.userCons[0] ? conversation.users.find(u => u._id !== MessagesStore.userId)._id : null;



    let text = '';
    let newStatus = '';
    switch (status) {
        case 'Active': 
            text = 'Are you sure you want to cancel the barter?';
            newStatus = 'Cancelled';
        break;
        case 'Pending': 
            text = firstSender === MessagesStore.userId ? 'Cancel request? The request will be deleted' : `Starting barter with ${partnerFirstName}`;
            newStatus = firstSender === MessagesStore.userId ? 'Cancelled' : 'Active';
        break;
        default: text = ''; newStatus = '';
    }

    const updateAndClosePopup = () => {
        MessagesStore.updateAndClosePopup(newStatus, 'generalPopup');
        if (newStatus === 'Active' && UserStore.user.neighbors.every(n => n._id !== partnerId)) {MessagesStore.addNeighbor(partnerId)}
    }

    const closePopup = () => MessagesStore.closePopup('generalPopup');

    return (
        <Dialog open = {MessagesStore.generalPopup} onClose={closePopup}>
            <DialogContent>
                <Typography>{text}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick = {closePopup}>Cancel</Button>
                <Button color='primary' onClick = {updateAndClosePopup}>Continue</Button>
            </DialogActions>
        </Dialog>
    )
}))

export default GeneralPopup;