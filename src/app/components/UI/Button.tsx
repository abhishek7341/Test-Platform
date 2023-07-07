import { Button } from "@mui/material"
import classes from './Button.module.css'

const CustomButton = ({...props})=> {
    return (
        <Button sx={{color:'orange',borderRadius:'20px',backgroundColor:'white',border:'2px solid orange','&:hover':{backgroundColor:'orange',color:'white'}}} type={props.type} variant="contained">{props.children}</Button>
    )
}
export default CustomButton