import { ReactNode } from "react";

interface CertificateOfficialsProps {
  children: ReactNode;
}

const CertificateOfficials = ({ children }: CertificateOfficialsProps) => {
  return (
    <div className="border max-w-[200px] p-2">
      <h1 className="font-semibold text-center text-[14px]">
        Barangay Malamig Officials
      </h1>
      <div>{children}</div>
      <p className="text-[14px] italic text-center mt-10">
        SERBISYONG MANALO, PANALO!
      </p>
    </div>
  );
};

interface OfficialsItemProps {
  name: string;
  position: string;
}

export const OfficialsItem = ({ name, position }: OfficialsItemProps) => {
  return (
    <div className="text-center my-3">
      <h1 className="uppercase text-[12px] font-medium">{name}</h1>
      <p className="text-[12px] mt-[-5px]">{position}</p>
    </div>
  );
};

export const Officials = () => {
  return (
    <CertificateOfficials>
      <OfficialsItem name="Cynthia M. Caluya" position="Barangay Captain" />
      <OfficialsItem name="Marwin R. Manalo" position="Kagawad" />
      <OfficialsItem name="Alvin C. Pabilonia" position="Kagawad" />
      <OfficialsItem name="Princess Lorena A. Callos" position="Kagawad" />
      <OfficialsItem name="Bobby Mar B. Peregrino" position="Kagawad" />
      <OfficialsItem name="Andrew Regalado S. Dacumos" position="Kagawad" />
      <OfficialsItem name="Rogelio G. Molina " position="Kagawad" />
    </CertificateOfficials>
  );
};

export default CertificateOfficials;
