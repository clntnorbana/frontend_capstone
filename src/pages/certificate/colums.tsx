import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavLink } from "react-router-dom";
import { formatDate } from "@/utils/format.date";
import { TRequestCertificate } from "@/types";

export const columns: ColumnDef<TRequestCertificate>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const certificate = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only"></span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(certificate.transaction_id || "")
              }
            >
              Copy transaction ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <NavLink
                to={`/certificate/request/${certificate.transaction_id}`}
              >
                View resident
              </NavLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "transaction_id",
    header: "Transaction ID",
    cell: ({ row }) => {
      return (
        <NavLink
          className="text-blue-700"
          to={`/certificate/request/${row.getValue("transaction_id")}`}
        >
          {row.getValue("transaction_id")}
        </NavLink>
      );
    },
  },
  {
    accessorKey: "certificate_type",
    header: "Certificate Type",
  },
  {
    accessorKey: "request_by",
    header: "Resident Name",
    cell: ({ row }) => {
      return <span className="capitalize">{row.getValue("request_by")}</span>;
    },
  },
  {
    accessorKey: "contact_no",
    header: "Contact No.",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <span
          className={`${
            row.getValue("status") === "pending"
              ? "bg-blue-500"
              : row.getValue("status") === "approved"
              ? "bg-green-500"
              : "bg-red-500"
          } p-1.5 px-2 text-white rounded-full`}
        >
          {row.getValue("status")}
        </span>
      );
    },
  },
  {
    accessorKey: "request_date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Request Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return formatDate(row.getValue("request_date"));
    },
  },
];
