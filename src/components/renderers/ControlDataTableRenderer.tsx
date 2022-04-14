import { ClassNames } from "@emotion/react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { CompactTable } from "@table-library/react-table-library/compact";
import React, { FC, useState } from "react";
import { connect } from "react-redux";
import { setSelectedDataTableColumn } from "../../store/actions/selections";
import {
  ConnectedDataTableDesignDisplayProps,
  DataTableDesignDisplayProps,
  DataTableSelection,
  State,
} from "../../types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    selectedColumn: {
      color: "orange",
    },
    unselectedColumn: {},
  })
);

interface TableDesignDisplayProps {
  onMouseOver: (event: React.SyntheticEvent) => void;
  onMouseOut: (event: React.SyntheticEvent) => void;
  onColumnClick: (columnId: string) => (event: React.SyntheticEvent) => void;
  tableId: string;
  data: any;
  focussedColumnId: string | undefined;
}
const DataTable = (props: TableDesignDisplayProps) => {
  const data = { nodes: props.data };
  const classes = useStyles();
  const COLUMNS = [
    {
      label: "Task",
      renderCell: (item: any) => {
        return (
          <div
            className={props.focussedColumnId === item.id ? classes.selectedColumn : classes.unselectedColumn}
            id={`${props.tableId}-${item.id}`}
            onClick={props.onColumnClick(item.id)}
          >
            {item.name}
          </div>
        );
      },
    },
    {
      id: "deadline",
      label: "Deadline",
      renderCell: (item: any) =>
        item.deadline.toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
    },
    { id: "type", label: "Type", renderCell: (item: any) => item.type },
    {
      id: "complete",
      label: "Complete",
      renderCell: (item: any) => item.isComplete.toString(),
    },
    { id: "tasks", label: "Tasks", renderCell: (item: any) => item.nodes },
  ];

  return <CompactTable columns={COLUMNS} data={data as any} />;
};
const DataTableWrapper: FC<DataTableDesignDisplayProps & ConnectedDataTableDesignDisplayProps> = (
  props: DataTableDesignDisplayProps & ConnectedDataTableDesignDisplayProps
) => {
  const data = [
    {
      id: "data-id1",
      name: "Shopping List",
      deadline: new Date(2020, 1, 15),
      type: "TASK",
      isComplete: true,
      nodes: 3,
    },
    {
      id: "data-id2",
      name: "Travel Ideas'",
      deadline: new Date(2022, 2, 4),
      type: "TASK",
      isComplete: false,
      nodes: 5,
    },
  ];
  const classes = useStyles();
  const { paper, selectedPaper } = classes;
  const {
    focussedControlId,
    focussedDataTableColumnId,
    focussedComponentId,
    component,
    id,
    setSelectedDataTableColumn,
  } = props;
  const [tableMouseOver, setTableMouseOver] = useState(false);
  const onTableMouseOver = () => setTableMouseOver(true);
  const onTableMouseOut = () => setTableMouseOver(false);
  const componentId = component.id;

  const onColumnClick = (columnId: string) => (e: React.SyntheticEvent<Element, Event>) => {
    e.preventDefault();
    if (focussedDataTableColumnId !== columnId) {
      setSelectedDataTableColumn({
        focussedComponentId: componentId,
        focussedControlId: id,
        focussedDataTableColumnId: columnId,
      });
    }
    e.stopPropagation();
  };

  const onDelete = () => {};
  const hasFocus = id === focussedControlId;
  const hasColumnFocus = focussedDataTableColumnId && componentId === focussedComponentId && id === focussedControlId;

  return (
    <DataTable
      focussedColumnId={focussedDataTableColumnId}
      data={data}
      tableId={id}
      onMouseOver={onTableMouseOver}
      onMouseOut={onTableMouseOut}
      onColumnClick={onColumnClick}
    />
  );
};

const mapStateToProps = (state: State): DataTableSelection | undefined => {
  const {
    selections: { info },
  } = state;
  if (info?.type) {
    const focussedControlId = (info as unknown as DataTableSelection).focussedControlId;
    const focussedDataTableColumnId = (info as unknown as DataTableSelection).focussedDataTableColumnId;
    const focussedComponentId = (info as unknown as DataTableSelection).focussedComponentId;
    return { focussedControlId, focussedDataTableColumnId, focussedComponentId };
  }
  return undefined;
};
const mapDispatchToProps = {
  setSelectedDataTableColumn,
};

const ControlDataTableRenderer = connect(mapStateToProps, mapDispatchToProps)(DataTableWrapper);

export default ControlDataTableRenderer;
