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
import { TResident } from "@/types";
import { formatDate } from "@/utils/format.date";

export const columns: ColumnDef<TResident>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const resident = row.original;

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
                navigator.clipboard.writeText(resident.profile_id || "")
              }
            >
              Copy profile ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <NavLink to={`/resident/profile/${resident.profile_id}`}>
                View resident
              </NavLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
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
    id: "name",
    accessorFn: (row) =>
      `${row.firstname} ${row.middlename ? row.middlename : ""} ${
        row.lastname
      }`,
    cell: ({ row }) => {
      return <span className="capitalize">{row.getValue("name")}</span>;
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "sex",
    header: "Sex",
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
    accessorKey: "voter",
    cell: ({ row }) => {
      return (
        <p
          className={`text-center text-white rounded-full py-1.5 ${
            row.getValue("voter") ? "bg-blue-500" : "bg-red-500"
          }`}
        >
          {row.getValue("voter") ? "YES" : "NO"}
        </p>
      );
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Voter
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Registered
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return formatDate(row.getValue("created_at"));
    },
  },
];
