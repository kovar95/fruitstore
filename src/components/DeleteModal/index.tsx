"use client";

import { FC, useMemo, useState } from "react";
import {
  Button,
  IconButton,
  Modal,
  Snackbar,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import StripedDataGrid from "@/ui/StripedDataGrid";
import {
  GridColDef,
  GridRenderCellParams,
  GridValidRowModel,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import { getCountryFromCode } from "@/utils/parser";
import { useActions } from "@/providers/ActionsProvider";
import { FruitItem } from "@/types/FruitItem";
import { useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import ModalContent from "@/ui/ModalContent";

function GridDeleteCell({
  value,
}: {
  value: GridRenderCellParams<GridValidRowModel, FruitItem, string>;
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [disabled, setDisabled] = useState(false);

  const { id } = value.row;

  const deleteItem = async () => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API as string}/${id}`);
      setDisabled(true);
    } catch (err) {
      setError((err as AxiosError).message);
    } finally {
      setOpen(false);
    }
  };

  return (
    <>
      <Tooltip
        open={open}
        title={
          <Stack gap={1.5}>
            <Stack
              direction="row"
              gap={1}
              alignItems="center"
              justifyContent="space-between"
            >
              <WarningRoundedIcon color="error" />
              Are you sure to delete this Fruit?
            </Stack>
            <Stack direction="row" gap={1} justifyContent="flex-end">
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="contained" onClick={deleteItem}>
                OK
              </Button>
            </Stack>
          </Stack>
        }
        placement="top-end"
        arrow
      >
        <Button onClick={() => setOpen(!open)} disabled={disabled}>
          Delete
        </Button>
      </Tooltip>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        message={error}
      />
    </>
  );
}

function renderDeleteCell(
  params: GridRenderCellParams<GridValidRowModel, FruitItem, string>
) {
  return <GridDeleteCell value={params} />;
}

const DeleteModal: FC = () => {
  const {
    toggleAction,
    state: { remove },
  } = useActions();

  const colData: GridColDef<GridValidRowModel>[] = useMemo(() => {
    return [
      {
        field: "tab",
        width: 150,
        sortable: false,
        headerName: "Tab",
        disableColumnMenu: true,
      },
      {
        field: "countryCode",
        width: 180,
        sortable: false,
        headerName: "Country",
        disableColumnMenu: true,
        valueFormatter: ({ value }: GridValueFormatterParams<string>) =>
          getCountryFromCode(value),
      },
      {
        field: "name",
        width: 150,
        sortable: false,
        headerName: "Fruit",
        disableColumnMenu: true,
      },
      {
        field: "action",
        width: 120,
        sortable: false,
        headerName: "Action",
        disableColumnMenu: true,
        renderCell: (
          params: GridRenderCellParams<GridValidRowModel, FruitItem, string>
        ) => renderDeleteCell(params),
      },
    ];
  }, []);

  const queryClient = useQueryClient();
  const data: FruitItem[] = queryClient.getQueryData(["fruits"]) ?? [];

  const rowData = useMemo(() => data ?? [], [data?.length]);

  return (
    <Modal open={remove} onClose={() => toggleAction("remove")}>
      <ModalContent>
        <Typography variant="h2" fontSize={24}>
          Delete Fruit
        </Typography>
        <Stack>
          <StripedDataGrid
            rows={rowData}
            columns={colData}
            getRowClassName={(params): string =>
              params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
            }
            disableRowSelectionOnClick
            hideFooter
            autoHeight
            scrollbarSize={5}
          />
        </Stack>
        <IconButton
          sx={{ position: "absolute", top: 10, right: 10, color: "#fff" }}
          onClick={() => toggleAction("remove")}
        >
          <CloseOutlinedIcon fontSize="large" />
        </IconButton>
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
