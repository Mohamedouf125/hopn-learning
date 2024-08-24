const FullPagePopup = ({ children }) => {
  return (
    <div className="w-[100vw] h-[100vh] fixed top-0 left-0 ring-0 bottom-0 bg-[#00000063] z-[1000] flex items-start justify-center">
      <div className="container">{children}</div>
    </div>
  );
};

export default FullPagePopup;
