import '../Styles/Home.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

//muiMaterial
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';

//FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

export const BarraHorizontal = ({ onChange = () => null }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const info = [
    {
      username: 'Michael Sosa',
      imagen:
        'https://www.paredro.com/wp-content/uploads/2015/08/shutterstock_188419790-e1439475344980.jpg',
      iniciales: 'MS',
    },
  ];

  const navigate = useNavigate();
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
    <div className="BarraHorizontal">
      <div>
        {info.length ? (
          info.map((infor, index) => (
            <div key={index}>
              <div className="cont-primary">
                <div className="titulo">
                  <h1>{infor.username}</h1>
                  <h2>MultiOpticas</h2>
                </div>

                <div className="cont-imgprofile" onClick={handleClick}>
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
            color: 'rgb(38, 103, 177)',
            position: 'absolute',
            right: '45px',
            top: '75%',
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
                  <div className="cols-miprofile">
                    <div className="rowsspan">
                      <div className="imgavatar-profile">
                        {persona.imagen ? (
                          <img className="photo" src={persona.imagen} alt="" />
                        ) : (
                          persona.iniciales
                        )}
                      </div>
                    </div>

                    <div className="tituloProfile">
                      <h1>Hola</h1>
                      <h2>{persona.username}</h2>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className=""></div>
            )}
          </div>
          {/* <Avatar /> Profile */}
        </MenuItem>
        <div className="list-web">
          <MenuItem
            className="MenuItem"
            style={{ borderTop: '1px solid #EFEFEF', height: '62px' }}
            onClick={''}
          >
            <ListItemIcon>
              <FontAwesomeIcon className="iconDrop" icon={faCircleUser} />
            </ListItemIcon>
            <Link className="linkDropDown" to="">
              Perfil
            </Link>
          </MenuItem>
        </div>
      </Menu>
    </div>
  );
};
