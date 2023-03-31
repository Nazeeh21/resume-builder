import { Navbar } from "./Navbar";

export const Layout = ({ children }) => {
  return (
    <div className="bg-white">
      <Navbar />
      {children}
    </div>
  );
};
