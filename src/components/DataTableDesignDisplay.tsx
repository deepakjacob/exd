import { createStyles, makeStyles, Paper, Theme } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { PrintSharp } from "@material-ui/icons";
import { CompactTable } from "@table-library/react-table-library/compact";
import React, { FC, useState } from "react";
import { connect } from "react-redux";
import { setSelectedFormComponent, setSelectedFormField } from "../store/actions/selections";
import {
  ComponentSelectionType,
  ConnectedDataTableDesignDisplayProps,
  DataTableDesignDisplayProps,
  DataTableSelection,
  State,
} from "../types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },

    paper: {
      border: "1px dotted",
      padding: theme.spacing(2),
      position: "relative",
      margin: "3px",
    },
    selectedPaper: {
      padding: theme.spacing(2),
      border: `1px solid green`,
      position: "relative",
      margin: "3px",
    },
    notoolbar: {
      display: "none",
      position: "absolute",
      top: "5px",
      right: "5px",
      width: "60px",
      height: "45px",
    },
    toolbar: {
      display: "block",
      position: "absolute",
      top: "5px",
      right: "5px",
      width: "60px",
      height: "45px",
    },
  })
);

const nodes = [
  {
    id: "0",
    name: "Shopping List",
    deadline: new Date(2020, 1, 15),
    type: "TASK",
    isComplete: true,
    nodes: 3,
  },
];
interface TableDesignDisplayProps {
  onClick: (event: any) => void;
  onMouseOver: (event: any) => void;
  onMouseOut: (event: any) => void;
}
const DataTableDisplay = (props: TableDesignDisplayProps) => {
  const COLUMNS = [
    { label: "Task", renderCell: (item: any) => item.name },
    {
      label: "Deadline",
      renderCell: (item: any) =>
        item.deadline.toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
    },
    { label: "Type", renderCell: (item: any) => item.type },
    {
      label: "Complete",
      renderCell: (item: any) => item.isComplete.toString(),
    },
    { label: "Tasks", renderCell: (item: any) => item.nodes },
  ];

  const data = { nodes };
  return <CompactTable columns={COLUMNS} data={data as any} />;
};
const DTDisplay: FC<DataTableDesignDisplayProps & ConnectedDataTableDesignDisplayProps> = (
  props: DataTableDesignDisplayProps & ConnectedDataTableDesignDisplayProps
) => {
  const classes = useStyles();
  const { paper, selectedPaper } = classes;
  const { component, metadata, focussedTableId, setSelectedTable, focussedColumnId, setSelectedColumn } = props;
  const [tableMouseOver, setTableMouseOver] = useState(false);
  const onTableMouseOver = () => setTableMouseOver(true);
  const onTableMouseOut = () => setTableMouseOver(false);
  const [componentMouseOver, setComponentMouseOver] = useState(false);

  const onComponentMouseOver = () => setComponentMouseOver(true);
  const onComponentMouseOut = () => setComponentMouseOver(false);

  const onTableFocus = (id: string) => (e: any) => {
    e.preventDefault();
    if (focussedTableId !== id) {
      setSelectedTable({ focussedTableId: id });
    }
    e.stopPropagation();
  };
  const onColumnFocus = (tableId: string, columnId: string) => (e: any) => {
    e.preventDefault();
    if (focussedColumnId !== columnId) {
      setSelectedColumn({
        focussedTableId: tableId,
        focussedColumnId: columnId,
      });
    }
    e.stopPropagation();
  };

  const onDelete = () => {};
  const hasFocus = component.id === focussedTableId;
  // todo: find out which column has focus
  const hasColumnFocus = false;

  return (
    <DataTableDisplay
      onClick={onTableFocus(component.id)}
      onMouseOver={onTableMouseOver}
      onMouseOut={onTableMouseOut}
    />
  );
};

const mapStateToProps = (state: State): DataTableSelection | undefined => {
  const {
    selections: { info },
  } = state;
  if (info?.type === ComponentSelectionType.DATA_TABLE) {
    const focussedTableId = (info as DataTableSelection).focussedTableId;
    const focussedColumnId = (info as DataTableSelection).focussedColumnId;
    const isHeaderSelected = (info as DataTableSelection).isHeaderSelected;
    return { focussedTableId, focussedColumnId, isHeaderSelected };
  }
  return undefined;
};
const mapDispatchToProps = {
  setSelectedFormField,
};

const DataTableDesignDisplay = connect(mapStateToProps, mapDispatchToProps)(DTDisplay);

export default DataTableDesignDisplay;
