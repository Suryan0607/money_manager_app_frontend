import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate,useParams } from 'react-router-dom';
import {default as api} from "../store/apiSlice"
import DeleteIcon  from '@mui/icons-material/Delete';

export default function AccountMenu() {

  const{id,name}= useParams();

  const [deleteUser] = api.useDeleteUserMutation()

  const navigate = useNavigate();
 
  const { data } = api.useSignoutUserQuery();

  const signOuthandler=(e)=>{

    if (e){

      alert(data.message)
      navigate('/signin')

    } else{
      return {}
    }  
  }

const deletehandler = ( e ) =>{

  if(e){
    
    const response= deleteUser({ _id: id });

    if(response){
      navigate('/signup')
    }
   
  }else{
    return {}
  }
  
}

  const handler =(e)=>{
    if(e){
      navigate(`/update_user/${id}/${name}`)
    }else{
      return {} 
    }
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  
  return (
    <React.Fragment>
      <Box sx={{ display: 'fixed', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            hover="false"
            size="small"
            sx={{ ml: 1 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}><AccountCircleIcon /></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar /> {name}
        </MenuItem>
        
        <MenuItem onClick={handler}>
          <ListItemIcon  >
            <Settings id="settings" fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>

        <MenuItem onClick={deletehandler}>
          <ListItemIcon  >
          <DeleteIcon id="delete" fontSize="small" />
          </ListItemIcon>
          Delete Account
        </MenuItem>
       

        <MenuItem  onClick={signOuthandler}>
          <ListItemIcon >
            <Logout fontSize="small" />
          </ListItemIcon>
         Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
