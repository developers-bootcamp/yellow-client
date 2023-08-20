import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from '@mui/x-data-grid-generator';
import { IUser } from '../types/IUser';




interface GlobalTableProps {
  data: GridRowsProp<IUser>,
  columns: GridColDef[],
  color: string,
  title: string,
  type: string,
  editable: boolean,
}

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
}



interface RowMode {
  edit?: boolean,
  id?: GridRowId,
}

const GlobalTable: React.FC<GlobalTableProps> = ({ editable, data, title, color, columns, type,/* onDataUpdated */ }) => {
  useEffect(() => { console.log(data) }, []);

  const [rowsMode, setRowsMode] = useState<RowMode[]>([])
  const [editMode, setEditMode] = useState(false);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  function EditToolbar(props: EditToolbarProps) {
    const { setRows, setRowModesModel } = props;
  
    const handleClick = () => {
      const id = randomId();
      setRows((oldRows) => [...oldRows, { id, fullName: '', password: '', email: '', address: '', phone: '', isNew: true }]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
      }));
      setAction(addActions(false, id))
    };
  
    return (
      <GridToolbarContainer>
        <Button style={{ color: 'gray' }} startIcon={<AddIcon />} onClick={handleClick}>
          Add {type }
        </Button>
      </GridToolbarContainer>
    );
  }

  const addActions = (isEditMode: boolean, editid: GridRowId) => {
    const newObject = {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }: { id: GridRowId }) => {

        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        if (isEditMode && editid === id) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }


        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      }
    }
    return newObject;
  }

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };


  const handleEditClick = (id: GridRowId) => () => {
    //onRowUpdated(rowModesModel, id)
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    setAction(addActions(true, id))
  };



  const handleSaveClick = (id: GridRowId) => () => {
   setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    setAction(addActions(false, id))
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
    setAction(addActions(false, id))
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row: any) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);

  };


  const [currentId, setCurrentId] = useState(-1)
  const [rows, setRows] = useState(data);
  const [columnsState, setColumnsState] = useState(columns);
  const [actions, setAction] = React.useState(addActions(false, '-1'))

  return (
    <Box
      sx={{
        height: '30%',
        marginLeft: '10%',
        width: '80%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <ArrowCircleDownIcon style={{ color: color, paddingLeft: '7px' }}></ArrowCircleDownIcon>
      <span style={{ color: color, padding: '7px', verticalAlign: 'super' }}>{title}</span>
      <DataGrid
        rows={rows}
        columns={columnsState.concat(actions)}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}
export default GlobalTable;
