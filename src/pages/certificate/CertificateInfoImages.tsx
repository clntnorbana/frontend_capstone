type CertificateInfoImagesProps = {
  img: string;
};

const CertificateInfoImages = ({ img }: CertificateInfoImagesProps) => {
  return (
    <a href={img} target="_blank">
      <img className="w-full h-full object-cover rounded" src={img} alt={img} />
    </a>
  );
};
export default CertificateInfoImages;
