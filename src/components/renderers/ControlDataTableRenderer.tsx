import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { CompactTable } from "@table-library/react-table-library/compact";
import React, { FC, useState } from "react";
import { connect } from "react-redux";
import { setSelectedFormControl } from "../../store/actions/selections";
import {
  ConnectedDataTableDesignDisplayProps,
  ControlType,
  DataTableDesignDisplayProps,
  DataTableSelection,
  State,
} from "../../types";
import { setSelectedDataTable } from "../../store/actions/selections";

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
  onColumnFocus: (event: any) => void;
}
const DataTable = (props: TableDesignDisplayProps) => {
  const COLUMNS = [
    { label: "Task", renderCell: (item: any) => <div onClick={props.onColumnFocus}>{item.name}</div> },
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
  return (
    <div onClick={props.onClick}>
      <CompactTable columns={COLUMNS} data={data as any} />;
    </div>
  );
};
const DataTableWrapper: FC<DataTableDesignDisplayProps & ConnectedDataTableDesignDisplayProps> = (
  props: DataTableDesignDisplayProps & ConnectedDataTableDesignDisplayProps
) => {
  const classes = useStyles();
  const { paper, selectedPaper } = classes;
  const { focussedTableId, setSelectedTable, focussedColumnId, setSelectedColumn, id } = props;
  const componentId = id;
  const [tableMouseOver, setTableMouseOver] = useState(false);
  const onTableMouseOver = () => setTableMouseOver(true);
  const onTableMouseOut = () => setTableMouseOver(false);

  const onTableFocus = (id: string) => (e: any) => {
    e.preventDefault();
    if (focussedTableId !== id) {
      setSelectedDataTable({ focussedComponentId: componentId, focussedDataTableId: id });
    }
    e.stopPropagation();
  };
  const onColumnFocus = (tableId: string, columnId: string) => (e: any) => {
    e.preventDefault();
    if (focussedColumnId !== columnId) {
      setSelectedColumn({
        focussedComponentId: componentId,
        focussedDataTableId: tableId,
        focussedColumnId: columnId,
      });
    }
    e.stopPropagation();
  };

  const onDelete = () => {};
  const hasFocus = componentId === focussedTableId;
  // todo: find out which column has focus
  const hasColumnFocus = false;

  return (
    <DataTable
      onClick={onTableFocus(componentId)}
      onMouseOver={onTableMouseOver}
      onMouseOut={onTableMouseOut}
      onColumnFocus={onColumnFocus(componentId, componentId)}
    />
  );
};

const mapStateToProps = (state: State): DataTableSelection | undefined => {
  const {
    selections: { info },
  } = state;
  if (info?.type === ControlType.DATA_TABLE) {
    // const focussedTableId = (info as DataTableSelection).focussedTableId;
    // const focussedColumnId = (info as unknown as DataTableSelection).focussedColumnId;
    // const isHeaderSelected = (info as DataTableSelection).isHeaderSelected;
    // return { focussedTableId, focussedColumnId, isHeaderSelected };
  }
  return undefined;
};
const mapDispatchToProps = {
  setSelectedFormControl,
};

const ControlDataTableRenderer = connect(mapStateToProps, mapDispatchToProps)(DataTableWrapper);

export default ControlDataTableRenderer;
