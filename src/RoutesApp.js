import React from "react";
import { Route, Routes } from "react-router-dom";
import ListPermission from "./permission/list/ListPermission";
import AddPermission from "./permission/add/AddPermision";
import UpdatePermission from "./permission/update/UpdatePermission";

export default function RoutesApp(){
    return (
        <Routes>
            <Route path = "/" element = {<ListPermission></ListPermission>}></Route>
            <Route path = "/add" element = {<AddPermission></AddPermission>}></Route>
            <Route path = "/update" element = {<UpdatePermission></UpdatePermission>}></Route>
        </Routes>
    );
}