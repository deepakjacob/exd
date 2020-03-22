import React from "react";
import { connect } from "react-redux";
import Box from "@material-ui/core/Box";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

// import AppBar from "../components/AppBar";
// import WithAppBar from "../hocs/WithAppBar";
// import { State } from "../store/configureStore";
// import {
//   //getTenant,
//   sayHello
// } from "../store/actions/toolbar";
import MultiControlDesignDisplay, { MultiControlDesignDisplayProps } from "../components/MultiControlDesignDisplay";
import { DesignControlType } from "../types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    }
  })
);

interface ViewProps {
  isPending: boolean;
  tenants: any;
  // getTenant: typeof getTenant;
  // sayHello: typeof sayHello;
}

const throwAwayProps: MultiControlDesignDisplayProps = {
  controlDesignProps: [
    {
      control: {
        id: "LABEL_CONTROL_ID",
        designControlType: DesignControlType.LABEL
      },
      metadata: {
        id: "someLabelId",
        name: "someLabelName"
      }
    },
    {
      control: {
        id: "ENTRY_FIELD_CONTROL_ID",
        designControlType: DesignControlType.ENTRY_FIELD
      },
      metadata: {
        id: "someEntryFieldId",
        name: "someEntryFieldName",
        label: "Entry Field Label",
        defaultValue: "Hello World",
        helperText: "This is some addtional info"
      }
    }
  ]
};

const View: React.FC<ViewProps> = props => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <MultiControlDesignDisplay {...throwAwayProps} />
    </Box>
  );
};

// const mapStateToProps = (state: State) => {
//   const {
//     toolbar: { isPending }
//   } = state;
//   return { isPending };
// };
// const mapDispatchToProps = {
//   sayHello
// };

// const DashBoardView = connect(mapStateToProps, mapDispatchToProps)(WithAppBar(View));

export default View;
