import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IUser } from "../types/IUser";
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';


interface GlobalTableProps {
  data: IUser[],
  columns: GridColDef[],
  color: string,
  title: string,
  type: string,
}

const GlobalTable: React.FC<GlobalTableProps> = ({ data, title, color, columns, type }) => {

  return (
    <>
      <ArrowCircleDownIcon style={{ color: color, paddingLeft: '7px' }}></ArrowCircleDownIcon>
      <span style={{ color: color, padding: '7px', verticalAlign: 'super' }}>{title}</span>
      <DataGrid
        rows={data}
        columns={columns}
        disableColumnFilter
        disableColumnMenu />

    </>
  )
}
export default GlobalTable;
