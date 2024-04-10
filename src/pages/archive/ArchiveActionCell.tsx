import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TArchive } from "@/types";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { NavLink } from "react-router-dom";
import ArchiveDeleteSingleModal from "./ArchiveDeleteSingleModal";
import { useState } from "react";

const ArchiveActionCell = ({ row }: { row: Row<TArchive> }) => {
  const archive = row.original;

  const [openSingleDeleteModal, setOpenSingleDeleteModal] =
    useState<boolean>(false);

  return (
    <>
      {/* delete single modal */}
      <ArchiveDeleteSingleModal
        onOpen={openSingleDeleteModal}
        onClose={() => setOpenSingleDeleteModal(false)}
        transaction_id={archive.transaction_id}
      />

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
            <NavLink to={`/resident/profile/${archive.profile_id}`}>
              View resident
            </NavLink>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenSingleDeleteModal(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ArchiveActionCell;
