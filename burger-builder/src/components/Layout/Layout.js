import React from "react";
import Aux from "../../hoc/auxilliary"
import classes from "./Layout.module.css"
const layout=(props)=>(
    <Aux>
        <div>ToolBars,SideDrawer,BackDrop</div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
)
export default layout;
