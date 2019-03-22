// @flow

/**
 * @fileoverview A modal dialog that can be closed by selecting one of the actions
 * or clicking outside the modal.
 */

import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

type Props = {
  children: React.Element<any>,
  open: boolean,
  title: string,
  confirmLabel: string,
  onCancel(): void,
  onConfirm(): void
};

type State = {
  open: boolean
};

class ConfirmDialog extends React.Component<Props, State> {
  state = {
    open: false,
  };

  render() {
    const { children, open, title, onCancel, confirmLabel, onConfirm }: Props = this.props;
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