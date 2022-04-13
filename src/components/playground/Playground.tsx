import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import React from "react";
import { ComponentDesignDisplayProps } from "../../types";
import ComponentDesignDisplay from "../ComponentDesignDisplay";

interface PlayDialogProps {
  open: boolean;
  handleClickOpen: any;
  handleClose: any;
  controls: any;
}

const ComponentGrid = (props: any) => {
  const { controls } = props;
  return (
    <Grid container spacing={3}>
      {controls?.map((cdp: ComponentDesignDisplayProps, i: number) => {
        const w = cdp.overriden?.dimension?.width ? cdp.overriden.dimension.width : cdp.metadata.dimension.width;
        return (
          <Grid item xs={w as any} key={i}>
            <ComponentDesignDisplay {...cdp} onDelete={undefined} onFocus={undefined} hasFocus={false} />
          </Grid>
        );
      })}
    </Grid>
  );
};

const PlayDialog = ({ open, handleClickOpen, handleClose, controls }: PlayDialogProps) => {
  return (
    <Dialog fullScreen open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Live View</DialogTitle>
      <DialogContent style={{ backgroundColor: "#efefef" }}>
        <DialogContentText>Page preview</DialogContentText>
        <ComponentGrid controls={controls} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const Playground = (props: PlayDialogProps) => {
  const { open, handleClickOpen, handleClose, controls } = props;
  return <PlayDialog open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} controls={controls} />;
};
