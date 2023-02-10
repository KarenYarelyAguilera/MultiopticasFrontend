import '../Styles/Home.css';
import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

//muiMaterial
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { List } from '@mui/material';

export const BarraHorizontal = ({ onChange = () => null }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const info = [
    {
      username: 'Michael Sosa',
      imagen: '',
      iniciales: 'MS',
    },
  ];

  const navigate = useNavigate();
  const location = useLocation();
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //
  const handleProfile = () => {
    navigate('/dashboard/profile');
    onChange();
  };

  return (
    <div>
      <div className="BarraHorizontal">
        {info.length ? (
          info.map((infor, index) => (
            <div key={index}>
              <div className="cont-primary">
                <div className="titulo">
                  <h1>{infor.username}</h1>
                  <h2>MultiOpticas</h2>
                </div>

                <div className="cont-imgprofile">
                  <div className="img-profile">
                    {infor.imagen ? (
                      <img className="photo" src={infor.imagen} alt="" />
                    ) : (
                      infor.iniciales
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="NoInformation"></div>
        )}
        <KeyboardArrowDownIcon
          onClick={handleClick}
          style={{
            backgroundColor: '#ECF6FA',
            borderRadius: 100,
            cursor: 'pointer',
            color: '#005F7F',
          }}
        />
      </div>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        className="cont-main dropMenu"
        PaperProps={{
          elevation: 0,
          sx: {
            boxShadow: '1px 1px 10px #D2E4EA',
            mt: {
              xs: 3,
              sm: 2.5,
            },
            ml: {
              xs: 0,
              sm: 1,
            },
            width: {
              xs: '100%',
              sm: 350,
            },
            maxWidth: {
              xs: 'calc(100% - 0px)',
              sm: 'calc(100% - 32px)',
            },
            height: {
              xs: 'calc(100% - 87px)',
              sm: 'auto',
            },
            borderRadius: {
              xs: 0,
              sm: 2,
            },
            opacity: 1,
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
        <MenuItem
          style={{
            backgroundColor: 'transparent',
            paddingTop: 0,
            paddingBottom: 0,
          }}
        >
          <div className="card-profile" onClick={handleProfile}>
            {info.length ? (
              info.map((persona, index) => (
                <div key={index}>
                  <div className="flex-cols-miprofile">
                    <div className="row-span-3">
                      <div className="rounded-full img-avatar-profile ml-4">
                        {persona.imagen ? (
                          <img src={persona.imagen} alt="" />
                        ) : (
                          persona.inicial
                        )}
                      </div>
                    </div>

                    <div className="pl-4">
                      <h1>Hola</h1>
                      <br></br>
                      <h2>{persona.username}</h2>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center opacity-50 pt-12"></div>
            )}
          </div>
          {/* <Avatar /> Profile */}
        </MenuItem>
        <div className="list-web">
          <MenuItem
            className=" fontLRegular pl-10 text-[#707070] hover:bg-[#ecf6fa] hover:text-[#005f7f]"
            style={{ borderTop: '1px solid #EFEFEF', height: '62px' }}
            onClick={''}
          >
            <ListItemIcon>
              <Link className=" w-5 h-5" to="">
                Perfil
              </Link>
            </ListItemIcon>
          </MenuItem>
        </div>
      </Menu>
    </div>
  );
};
