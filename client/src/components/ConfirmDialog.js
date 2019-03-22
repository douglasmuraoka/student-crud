/**
 * @fileoverview A modal dialog that can be closed by selecting one of the actions
 * or clicking outside the modal.
 */

import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

class ConfirmDialog extends Component {
  state = {
    open: false,
  };

  render() {
    const { children, open, title, onCancel, confirmLabel, onConfirm } = this.props;
    return (
      <div>
        <Dialog
          open={open}
          onClose={onCancel}
          aria-labelledby="responsive-dialog-title"
        >
          {/* Title  */}
          <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>

          {/* Content */}
          <DialogContent>
            <DialogContentText>
              {children}
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            {/* Cancel button */}
            <Button onClick={onCancel} color="primary">
              Cancel
          </Button>

            {/* Confirm button */}
            <Button onClick={onConfirm} color="primary">
              {confirmLabel}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withMobileDialog()(ConfirmDialog);