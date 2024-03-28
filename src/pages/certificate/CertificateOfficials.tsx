import { ReactNode } from "react";

interface CertificateOfficialsProps {
  children: ReactNode;
}

const CertificateOfficials = ({ children }: CertificateOfficialsProps) => {
  return (
    <div className="border border-gray-500 max-w-[200px] p-2">
      <h1 className="text-center text-[14px]">Barangay Malamig Officials</h1>
      <div>{children}</div>
      <p className="text-[14px] uppercase italic text-center mt-10">
        CYNTHIA CALUYA, MAY MALASAKIT!
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
      <h1 className="capitalize text-[12px] font-medium">{name}</h1>
      <p className="text-[12px] mt-[-5px]">{position}</p>
    </div>
  );
};

export const Officials = () => {
  return (
    <CertificateOfficials>
      <OfficialsItem
        name="Hon. Cynthia M. Caluya"
        position="Barangay Captain"
      />
      <OfficialsItem name="Hon. Marwin R. Manalo" position="Kagawad" />
      <OfficialsItem name="Hon. Alvin C. Pabilonia" position="Kagawad" />
      <OfficialsItem name="Hon. Princess Lorena A. Callos" position="Kagawad" />
      <OfficialsItem name="Hon. Bobby Mar B. Peregrino" position="Kagawad" />
      <OfficialsItem
        name="Hon. Andrew Regalado S. Dacumos"
        position="Kagawad"
      />
      <OfficialsItem name="Hon. Pedrito C. Catanyag Jr." position="Kagawad" />
      <OfficialsItem name="Hon. Rogelio G. Molina" position="Kagawad" />
      <OfficialsItem
        name="Maria Cristina Bianca C. Borja"
        position="Secretary"
      />
      <OfficialsItem name="Nelson S. Añonueva" position="Secretary" />
    </CertificateOfficials>
  );
};

export default CertificateOfficials;
