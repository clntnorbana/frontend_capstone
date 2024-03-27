import * as React from "react";

// FOR FORMATTING TABLE
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

// DROPDOWN MENU
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// TABLE
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// ui components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RecordsDeleteAllModal from "./RecordsDeleteAllModal";
import { Download } from "lucide-react";
import { formatDate } from "@/utils/format.date";
import { CSVLink } from "react-csv";
import { useGetAllRecordsQuery } from "@/redux/slices/record.slice";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  // states
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  // open delete modal
  const [openDeleteModal, setOpenDeleteModal] = React.useState<boolean>(false);

  const { data: recordsData } = useGetAllRecordsQuery();
  // // csv download
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const csvData = recordsData?.map(({ id, committed_date, ...rest }) => ({
    committed_date: formatDate(committed_date),
    ...rest,
  }));

  return (
    <div>
      <div className="flex items-center py-4 gap-5">
        <Input
          placeholder="Filter by name..."
          value={
            (table.getColumn("resident_name")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("resident_name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <div className="space-x-2 ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                show/hide columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* download csv button */}
          <Button variant={"secondary"}>
            <CSVLink
              data={csvData || []}
              filename="REQUEST_CERTIFICATE_RECORD"
              target="_blank"
            >
              Download CSV
            </CSVLink>
            <Download size={15} className="ml-2" />
          </Button>

          {/* delete record button */}
          <Button
            variant={"destructive"}
            onClick={() => setOpenDeleteModal(true)}
          >
            Delete all
          </Button>

          {/* delete records modal */}
          <RecordsDeleteAllModal
            onOpen={openDeleteModal}
            onClose={() => setOpenDeleteModal(false)}
          />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
