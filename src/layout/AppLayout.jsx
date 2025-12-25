import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import MenuList from "../comps/MenuList";
import Header from "./Header";
import HamburgerMenu from "../comps/HamburgerMenu";

const AppLayout = () => {
  const [open, setOpen] = useState(false);
  const [headerLeft, setHeaderLeft] = useState(
    <HamburgerMenu onClick={() => setOpen(true)} />
  );
  const [headerCenter, setHeaderCenter] = useState(null);
  const [headerRight, setHeaderRight] = useState(null);

  const navigate = useNavigate();

  const handleMenuClick = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <>
      <Header left={headerLeft} center={headerCenter} right={headerRight} />

      <MenuList
        open={open}
        onClose={() => setOpen(false)}
        onItemClick={handleMenuClick}
      />

      <main>
        <Outlet context={{ setHeaderLeft, setHeaderCenter, setHeaderRight }} />
      </main>
    </>
  );
};

export default AppLayout;
