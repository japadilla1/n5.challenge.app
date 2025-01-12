import { useEffect, useState } from "react";
import { permissionApi } from "../services/PermissionApi";

export const usePermissionTypeList = () =>{
    const [permissionTypeList, setPermissionTypeList] = useState([]); 
    useEffect(()=>{
        getPermissionTypes();
    },[]);

    const getPermissionTypes = async () =>{
        const response = await permissionApi.get("PermissionType/permission/get-all");
        console.log("response ", response);
        setPermissionTypeList(response.data);
    };

    return {permissionTypeList};
};
