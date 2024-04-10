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
// import { formatDate } from "@/helpers/format.helpers";
import { NavLink } from "react-router-dom";
import { TArchive } from "@/types";
import { formatDate } from "@/utils/format.date";

export const columns: ColumnDef<TArchive>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original;

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
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <NavLink to={`/resident/profile/${item.profile_id}`}>
                View resident
              </NavLink>
            </DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
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
