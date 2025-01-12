import React from "react";
import Layout from "./shared/Layout";
import { BrowserRouter  } from "react-router-dom";
import RoutesApp from "./RoutesApp";

export default function App(){
    return (
        <>
            <BrowserRouter>
                <Layout>
                    <RoutesApp></RoutesApp>
                </Layout>
            </BrowserRouter>
        </>
    );
}