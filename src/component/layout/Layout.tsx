import React, { FC } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { useContextTheme } from "../../custom-hooks/useContextTheme";
interface LayoutProps {
  children: React.ReactNode;
  isloggedin: boolean;
}
const Layout: FC<LayoutProps> = ({ children, isloggedin }) => {
  const { currentTheme } = useContextTheme();

  return (
    <div className="main">
      {isloggedin && (
        <div className={`left ${currentTheme}`}>
          <Sidebar />
        </div>
      )}
      <div className="right">{children}</div>
    </div>
  );
};

export default Layout;
