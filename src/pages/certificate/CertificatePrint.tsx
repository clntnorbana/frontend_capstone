import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import CertificateClearance from "./CertificateClearance";
import { TRequestCertificate } from "@/types";
import CertificateIndigency from "./CertificateIndigency";

type CertificatePrintProps = {
  transaction_id: string | undefined;
  certificateData: TRequestCertificate;
};

const CertificatePrint = (props: CertificatePrintProps) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const data = props.certificateData;

  return (
    <div>
      <div className="hidden">
        {data.certificate_type === "indigency" ? (
          <CertificateIndigency ref={componentRef} data={data} />
        ) : (
          <CertificateClearance ref={componentRef} data={data} />
        )}
      </div>
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={handlePrint}
      >
        Download Certificate <Download size={20} />
      </Button>
    </div>
  );
};
export default CertificatePrint;
