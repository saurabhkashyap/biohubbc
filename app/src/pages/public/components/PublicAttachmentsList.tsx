import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Link from '@material-ui/core/Link';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import { mdiLockOutline, mdiLockOpenVariantOutline } from '@mdi/js';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Icon from '@mdi/react';
import { DATE_FORMAT } from 'constants/dateTimeFormats';
import { IGetProjectAttachment } from 'interfaces/useProjectApi.interface';
import React, { useState } from 'react';
import { handleChangePage, handleChangeRowsPerPage } from 'utils/tablePaginationUtils';
import { getFormattedDate, getFormattedFileSize } from 'utils/Utils';
import { useBiohubApi } from 'hooks/useBioHubApi';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme: Theme) => ({
  attachmentsTable: {
    '& .MuiTableCell-root': {
      verticalAlign: 'middle'
    }
  }
}));

export interface IPublicAttachmentsListProps {
  projectId: number;
  attachmentsList: IGetProjectAttachment[];
  getAttachments: (forceFetch: boolean) => void;
}

const PublicAttachmentsList: React.FC<IPublicAttachmentsListProps> = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const biohubApi = useBiohubApi();
  const preventDefault = (event: React.SyntheticEvent) => event.preventDefault();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const showRequestAccessDialog = () => {
    setOpen(true);
  };

  const hideRequestAccessDialog = () => {
    setOpen(false);
  };

  const viewFileContents = async (attachment: IGetProjectAttachment) => {
    try {
      const response = await biohubApi.public.project.getAttachmentSignedURL(
        props.projectId,
        attachment.id,
        attachment.fileType
      );

      if (!response) {
        // TODO: handle showing message indicating that no access to view file
        return;
      }

      window.open(response);
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      <Paper>
        <TableContainer>
          <Table className={classes.attachmentsTable} aria-label="attachments-list-table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Last Modified</TableCell>
                <TableCell>File Size</TableCell>
                <TableCell width="150px">Security Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.attachmentsList.length > 0 &&
                props.attachmentsList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                  <TableRow key={row.fileName}>
                    <TableCell scope="row">
                      <Link
                        underline="always"
                        component="button"
                        variant="body2"
                        onClick={() => {
                          if (row.securityToken) {
                            showRequestAccessDialog();
                          } else {
                            viewFileContents(row);
                          }
                        }}>
                        {row.fileName}
                      </Link>
                    </TableCell>
                    <TableCell>{row.fileType}</TableCell>
                    <TableCell>{getFormattedDate(DATE_FORMAT.ShortDateFormatMonthFirst, row.lastModified)}</TableCell>
                    <TableCell>{getFormattedFileSize(row.size)}</TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Icon path={row.securityToken ? mdiLockOutline : mdiLockOpenVariantOutline} size={1} />
                        <Box ml={0.5}>{row.securityToken ? 'Secured' : 'Unsecured'}</Box>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              {!props.attachmentsList.length && (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No Attachments
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {props.attachmentsList.length > 0 && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 15, 20]}
            component="div"
            count={props.attachmentsList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={(event: unknown, newPage: number) => handleChangePage(event, newPage, setPage)}
            onChangeRowsPerPage={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleChangeRowsPerPage(event, setPage, setRowsPerPage)
            }
          />
        )}
      </Paper>

      <Dialog open={open}>
        <DialogTitle>Access Denied</DialogTitle>
        <DialogContent>
          <Typography variant="body1" color="textSecondary">
            To access secure documents, please submit your request to{' '}
            <Link
              href="mailto:biohub@gov.bc.ca?subject=BioHub - Secure Document Access Request"
              underline="always"
              onClick={preventDefault}>
              biohub@gov.bc.ca
            </Link>
            . A data manager will review your request and contact you as soon as possible.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={hideRequestAccessDialog}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PublicAttachmentsList;