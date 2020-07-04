import React from 'react';
import onlineIcon from '../../assets/icons/onlineIcon.png';
import './sidebar.css';

const Sidebar = ({ users, room }) => (
  <div className="sidebar">
    {users ? (
      <div>
        <div className="side-header">
          <h3>Cheez Meez</h3>
        </div>
        <div className="side-content">
          <h4 className="label">Room Name</h4>
          <div className="active-item">
            <h5>{room}</h5>
          </div>
          <h4 className="label">Active</h4>
          <div className="active-list">
            <h5>
              {users.map(({ name }) => (
                <div key={name} className="active-item">
                  <img alt="Online Icon" src={onlineIcon} />
                  <span>{name}</span>
                </div>
              ))}
            </h5>
          </div>
        </div>
      </div>
    ) : null}
  </div>
);

export default Sidebar;
