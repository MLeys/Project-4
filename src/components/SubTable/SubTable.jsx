import * as React from 'react';
import { useContext } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { SkillsContext } from '../../context/SkillsContext/SkillsContext';



const columns = [
  { field: 'id', headerName: 'Id', width: 30 },
  { field: 'title', headerName: 'Title', width: 100 },
 
  {
    field: 'progress',
    headerName: 'Progress',
    description: 'Progess',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Leys', firstName: 'Mike', age: 36 },
];

export default function SubTable() {
  const ctx = useContext(SkillsContext);
  const subSkills = ctx.activeSkill?.subSkills;

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}