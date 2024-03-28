import { ColumnDef, Row } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowUpDown, MoreHorizontal } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import { TRecord } from "@/types";
import { formatDate } from "@/utils/format.date";
import { useDeleteRecordMutation } from "@/redux/slices/record.slice";
import UnauthorizedModal from "@/components/UnauthorizedModal";
import Loader from "@/components/Loader";

// eslint-disable-next-line react-refresh/only-export-components
const ActionsCell = ({ row }: { row: Row<TRecord> }) => {
  const record = row.original;

  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [deleteRecord, { isLoading }] = useDeleteRecordMutation();

  // delete record
  const handleDelete = async () => {
    const transaction_id = record.transaction_id;

    try {
      const res = await deleteRecord(transaction_id).unwrap();
      setSuccess(res.message);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setAlertMsg((error as any).data.message || (error as any).message);
    }
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess("");
        setDeleteModal(false);
      }, 1500);
    }
  }, [success]);

  return (
    <>
      <Modal isOpen={deleteModal}>
        {/* loading screen */}
        <Loader loading={isLoading} message="Deleting record, please wait..." />

        {success ? (
          <p>{success}</p>
        ) : (
          <>
            <div className="w-[400px]">
              <div className="border-b py-5 flex justify-center items-center">
                <AlertCircle className="text-red-500" size={50} />
              </div>
              <div className="text-gray-700 border-b py-5 font-medium">
                <p className="text-center text-lg">
                  Are you sure to delete this record? you cannot turn it back
                  once deleted.
                </p>
              </div>
              <div className="pt-5 flex justify-end gap-1">
                <Button
                  type="submit"
                  variant={"destructive"}
                  onClick={handleDelete}
                >
                  Confirm{" "}
                </Button>
                <Button
                  variant={"outline"}
                  onClick={() => setDeleteModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </>
        )}
      </Modal>

      <UnauthorizedModal isOpen={alertMsg === "unauthorized"} />

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
          <DropdownMenuItem onClick={() => setDeleteModal(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export const columns: ColumnDef<TRecord>[] = [
  {
    id: "actions",
    cell: ActionsCell,
  },
  {
    accessorKey: "transaction_id",
    header: "Transaction ID",
  },
  {
    accessorKey: "certificate_type",
    header: "Certificate Type ",
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
    accessorKey: "resident_name",
    header: "Resident Name",
    cell: ({ row }) => {
      return (
        <span className="capitalize">{row.getValue("resident_name")}</span>
      );
    },
  },
  {
    accessorKey: "resident_contact_no",
    header: "Contact No.",
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
  {
    accessorKey: "committed_by",
    header: "Committed By",
    cell: ({ row }) => {
      return <span className="capitalize">{row.getValue("committed_by")}</span>;
    },
  },
  {
    accessorKey: "committed_date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Committed Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return formatDate(row.getValue("committed_date"));
    },
  },
];
