import List from "@mui/material/List"

const historyList = ({data, limit}) => {
    const displayData = limit ? data.slice(0, limit) : data;
  return (
   <List>
    
   </List>
  )
}
export default historyList