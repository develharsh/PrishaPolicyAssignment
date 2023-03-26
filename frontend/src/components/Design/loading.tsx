import { LoadingOverlay } from "@mantine/core";
import { useContext } from "react";
import { DataContext } from "../../store/globalstate";

const Loading = () => {
  const { state } = useContext(DataContext);
  return (
    <LoadingOverlay
      visible={state.loading}
      overlayBlur={1}
      sx={{ position: "fixed" }}
    />
  );
};

export default Loading;
