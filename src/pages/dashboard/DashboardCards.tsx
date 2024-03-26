import Card from "@/components/Card";
// import {
//   filterRequestCertificateByDate,
//   filterResidentByDate,
// } from "@/helpers/filterData.helpers";
import { useGetRequestCertificatesQuery } from "@/redux/slices/certificate.slice";
import { useGetAllResidentsQuery } from "@/redux/slices/resident.slice";
import { TRequestCertificate, TResident } from "@/types";
import { filterByDate } from "@/utils/format.date";
import { ScrollText, UsersRound } from "lucide-react";
import { NavLink } from "react-router-dom";

// register resident card
export const RegisteredResidentCard = () => {
  // filter resident by date
  const filterResidentByDate = (data: TResident[]): TResident[] => {
    const filteredData = data.filter((item) => {
      return filterByDate(item.created_at || "");
    });

    return filteredData;
  };

  const { data, isLoading } = useGetAllResidentsQuery();
  const filteredDataByDate = data ? filterResidentByDate(data).length : 0;

  return (
    <NavLink to={"/residents"}>
      <Card
        title="Registered Residents"
        icon={<UsersRound size={25} opacity={0.8} />}
        content={`+${data?.length}`}
        subtext={`+${filteredDataByDate} this month`}
        loading={isLoading}
      />
    </NavLink>
  );
};

// request certificate card
export const RequestCertificateCard = () => {
  const { data, isLoading } = useGetRequestCertificatesQuery();

  // filter request certificate by date
  const filterRequestCertificateByDate = (
    data: TRequestCertificate[]
  ): TRequestCertificate[] => {
    const filteredData = data.filter((item) => {
      return filterByDate(item.request_date || "");
    });

    return filteredData;
  };

  const filteredDataByDate = data ? filterRequestCertificateByDate(data) : [];

  // status
  const filterDataByStatus = (status: string) => {
    const result = data?.filter((item) => item.status === status);

    return result;
  };

  return (
    <NavLink to={"/certificates"}>
      <Card
        title="Request Certificates"
        icon={<ScrollText size={25} opacity={0.8} />}
        content={`+${filteredDataByDate.length.toString()}`}
        contentSubtext="this month"
        subtext={`Pending +${
          filterDataByStatus("pending")?.length
        } | Approved +${filterDataByStatus("approved")?.length} | Rejected +${
          filterDataByStatus("rejected")?.length
        }`}
        loading={isLoading}
      />
    </NavLink>
  );
};
