import { Outlet } from "react-router";
import classes from "./Layout.module.css";
import { Footer } from "./footer/Footer";
import { ActionsMenu } from "../../../widgets/actions-menu";

export const Layout = () => {
  return (
    <div className={classes.layout}>
      <Outlet />
      <ActionsMenu
        menuTargetClassName={classes.burgerMenu}
        menuItems={["addNewExercise", "addNewTrainingSession"]}
      />
      <Footer className={classes.footer} />
    </div>
  );
};
