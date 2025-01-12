import { useEffect, useState } from "react";
import { permissionApi } from "../services/PermissionApi";

export const usePermissionList = () =>{
    const [permissionList, setPermissionList] = useState([]); 
    useEffect(()=>{
        getPermission();
    },[]);

    const getPermission = async () =>{
        const response = await permissionApi.get("Permission/permission/get-all");
        console.log("response ", response);
        setPermissionList(response.data);
    };

    return {permissionList};
};
