import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';
import { Formik } from 'formik';

export interface IEditDialogComponentProps {
  element: any;
  initialValues: any;
  validationSchema: any;
}

export interface IEditDialogProps {
  /**
   * The dialog window title text.
   *
   * @type {string}
   * @memberof IEditDialogProps
   */
  dialogTitle: string;
  /**
   * Set to `true` to open the dialog, `false` to close the dialog.
   *
   * @type {boolean}
   * @memberof IEditDialogProps
   */
  open: boolean;

  /**
   * @type {IEditDialogComponentProps}
   * @memberof IEditDialogProps
   */
  component: IEditDialogComponentProps;

  /**
   * Callback fired if the dialog is closed.
   *
   * @memberof IEditDialogProps
   */
  onClose: () => void;
  /**
   * Callback fired if the 'No' button is clicked.
   *
   * @memberof IEditDialogProps
   */
  onCancel: () => void;
  /**
   * Callback fired if the 'Yes' button is clicked.
   *
   * @memberof IEditDialogProps
   */
  onSave: (values: any) => void;
}

/**
 * A dialog for displaying a component for editing purposes and giving the user the option to say
 * `Yes`(Save) or `No`.
 *
 * @param {*} props
 * @return {*}
 */
export const EditDialog: React.FC<IEditDialogProps> = (props) => {
  return (
    <Box>
      <Formik
        initialValues={props.component.initialValues}
        validationSchema={props.component.validationSchema}
        validateOnBlur={true}
        validateOnChange={false}
        onSubmit={(values) => {
          props.onSave(values);
        }}>
        {(formikProps) => (
          <Dialog
            open={props.open}
            onClose={props.onClose}
            aria-labelledby="edit-dialog-title"
            aria-describedby="edit-dialog-description">
            <DialogTitle id="edit-dialog-title">{props.dialogTitle}</DialogTitle>
            <DialogContent>{props?.component?.element}</DialogContent>
            <DialogActions>
              <Button onClick={props.onCancel} color="primary">
                Cancel
              </Button>
              <Button onClick={formikProps.submitForm} color="primary" autoFocus>
                Save Changes
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Formik>
    </Box>
  );
};

export default EditDialog;