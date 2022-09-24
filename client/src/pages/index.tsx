import { Route, Routes } from "react-router-dom";
import { AdminPage } from "./AdminPage";
import { Home } from "./home";
export const Pages = (props: any) => {
  const { getCartDetails } = props
  return (
    <div>
      <Routes>
        <Route path={"/"} element={<Home getCartDetails={getCartDetails} />} />
        <Route path={"/AdminPage"} element={<AdminPage />} />
      </Routes>
    </div>
  );
};
