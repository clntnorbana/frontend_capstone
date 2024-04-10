import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { TArchive } from "@/types";
import { formatDate } from "@/utils/format.date";
import ArchiveActionCell from "./ArchiveActionCell";

export const columns: ColumnDef<TArchive>[] = [
  {
    id: "actions",
    cell: ArchiveActionCell,
  },
  {
    accessorKey: "transaction_id",
    header: "Transaction ID",
  },
  {
    accessorKey: "profile_id",
    header: "Profile ID",
    cell: ({ row }) => {
      return (
        <NavLink
          className="text-blue-700"
          to={`/resident/profile/${row.getValue("profile_id")}`}
        >
          {row.getValue("profile_id")}
        </NavLink>
      );
    },
  },
  {
    id: "request_by",
    accessorKey: "request_by",
    cell: ({ row }) => {
      return <span className="capitalize">{row.getValue("request_by")}</span>;
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Request By
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "certificate_type",
    header: "Certificate Type",
  },
  {
    accessorKey: "purpose",
    header: "Purpose",
  },
  {
    accessorKey: "contact_no",
    header: "Phone #",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "request_date",
    header: "Request Date",
    cell: ({ row }) => {
      return formatDate(row.getValue("request_date"));
    },
  },
  {
    accessorKey: "archive_date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Archive Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return formatDate(row.getValue("archive_date"));
    },
  },
];
