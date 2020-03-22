import React from "react";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

interface ControlItemDisplay {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
}
const options: ControlItemDisplay[] = [
  {
    id: "21212-sdsad-33434-sdfsdf-3443",
    icon: "star",
    title: "Address for communications",
    subtitle: "This component makes easy to design forms which contains addresses"
  }
];

interface NewControlDialogProps {
  classes: Record<"paper", string>;
  id: string;
  keepMounted: boolean;
  value: string;
  open: boolean;
  onClose: (value?: string) => void;
}

const NewControlDialog = (props: NewControlDialogProps) => {
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef<HTMLElement>(null);

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
            const { id, icon, title, subtitle } = option;
            return <FormControlLabel value={id} key={i} control={<Radio />} label={title} />;
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
