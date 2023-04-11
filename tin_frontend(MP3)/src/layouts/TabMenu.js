import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import AddRecord from "../components/AddRecord";
import DeleteRecord from "../components/DeleteRecord";
import UpdateRecord from "../components/UpdateRecord";
import Home from "./Home";
import { Link } from 'react-router-dom';

const TabMenu = () => {
  const [key, setKey] = useState("tin");

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      fill
    >
      <Tab
        eventKey="tin"
        title={
          <img className="logo-image" src="../images/logo.png" alt="Logo" />
        }
      >
        <Home />
      </Tab>
      <Tab eventKey="add" title="ADD RECORD">
        <AddRecord />
      </Tab>
      <Tab eventKey="update" title="UPDATE RECORD">
        <UpdateRecord />
      </Tab>
      <Tab eventKey="delete" title="DELETE RECORD">
        <DeleteRecord />
      </Tab>
    </Tabs>
  );
}

export default TabMenu;
