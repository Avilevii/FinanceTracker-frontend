import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

const HistoryTableHomePage = () => {
    const HEAD_TABLE = ["CATEGORY", 'NAME', "AMOUNT", "DATE"];

  return (
    <TableContainer component={Paper}>
        <Table sx={{minWidth: 500}}>
            <TableHead>
                <TableRow sx={{bgcolor: 'red'}}>
                    <TableCell  align='left'>CATEGORY</TableCell>
                    <TableCell align='left'>NAME</TableCell>
                    <TableCell align='left'>AMOUNT</TableCell>
                    <TableCell align='left'>DATE</TableCell>
                </TableRow>
            </TableHead>
        </Table>
    </TableContainer>
  )
}
export default HistoryTableHomePage