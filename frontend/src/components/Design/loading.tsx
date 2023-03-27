import { LoadingOverlay } from "@mantine/core";
import { useContext } from "react";
import { DataContext } from "../../store/globalstate";
import { IGlobalState } from "../../utils/types";

const Loading = () => {
  const { state } = useContext<IGlobalState>(DataContext);
  return (
    <LoadingOverlay
      visible={state.loading}
      overlayBlur={1}
      sx={{ position: "fixed" }}
    />
  );
};

export default Loading;
