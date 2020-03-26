import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import { getDefinition } from '../controlDefinitionRegister';
import { getControlSettings } from '../controlSetttingsRegister';
import { addControl as add } from '../store/actions/allControls';
import { ControlItemDisplay, DesignControlType } from '../types';

interface NewControlDialogProps {
  classes: Record<"paper", string>;
  id: string;
  keepMounted: boolean;
  value: string;
  open: boolean;
  onClose: (value?: string) => void;
  addControl: typeof add;
}

const NewControlDialog = (props: NewControlDialogProps) => {
  const { onClose, value: valueProp, open, addControl, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef<HTMLElement>(null);
  const options: ControlItemDisplay[] = getControlSettings();

  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(value);
    const designControlType = value as keyof typeof DesignControlType;
    const getControlDesignDisplayProps = getDefinition(DesignControlType[designControlType]);
    if (getControlDesignDisplayProps) {
      addControl(getControlDesignDisplayProps());
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      onEntering={handleEntering}
      aria-labelledby="new-control-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle id="new-control-dialog-title">Choose control</DialogTitle>
      <DialogContent dividers>
        <RadioGroup ref={radioGroupRef} aria-label="control" name="control" value={value} onChange={handleChange}>
          {options.map((option: ControlItemDisplay, i: number) => {
            const { id, icon, title, type, subtitle } = option;
            return <FormControlLabel value={type.toString()} key={i} control={<Radio />} label={title} />;
          })}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleOk} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewControlDialog;
