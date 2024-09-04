import React from "react";

const FloatingWhatsapp = () => {
  return (
    <a
      href="https://wa.me/971544066811"
      class="fixed flex items-center justify-center w-[60px] h-[60px] bottom-[40px] right-[40px] z-[100000] bg-[#25d366] text-[30px] text-white rounded-[50px] text-center  "
      target="_blank"
      style={{ boxShadow: "2px 2px 3px #999" }}
    >
      <i class="fab fa-whatsapp"></i>
    </a>
  );
};

export default FloatingWhatsapp;
