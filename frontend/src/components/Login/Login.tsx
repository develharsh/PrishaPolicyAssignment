import React, { ReactElement } from "react";
import "./Login.css";
import {
  Modal,
  TextInput,
  PasswordInput,
  Button,
  createStyles,
  SegmentedControl,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { DataContext } from "../../store/globalstate";
import { IGlobalState, IUser } from "../../utils/types";
import { ACTIONS, LoginReq, SignupReq } from "../../store/actions";
import { useForm } from "@mantine/form";
import Cookie from "js-cookie";
import { notifications } from "@mantine/notifications";

interface props {}

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    boxShadow: theme.shadows.md,
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[1]
    }`,
  },

  active: {
    backgroundImage: theme.fn.gradient({ from: "orange", to: "red" }),
  },

  control: {
    border: "0 !important",
  },

  labelActive: {
    color: `${theme.white} !important`,
  },
}));

const Login: React.FC<props> = (): ReactElement => {
  const { state, dispatch } = React.useContext<IGlobalState>(DataContext);
  const [opened, { open, close }] = useDisclosure(false);
  const [authType, setAuthType] = React.useState<string>("Login");
  const { classes } = useStyles();

  React.useEffect(() => {
    if (state?.login) {
      // alert("x");
      open();
    } else {
      // alert("y");
      close();
    }
  }, [state?.login, close, open]);

  const loginForm = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (value.length ? null : "Please Enter Your Email"),
      password: (value) => (value.length ? null : "Please Enter Password"),
    },
  });
  const signupForm = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },

    validate: {
      name: (value) => (value.length ? null : "Please Enter Your Name"),
      email: (value) => (value.length ? null : "Please Enter Your Email"),
      password: (value) => (value.length ? null : "Please Enter Password"),
    },
  });

  const handleSubmit = async (values: IUser) => {
    dispatch({ type: ACTIONS.LOADING, payload: true });
    const response = await (authType === "Login"
      ? LoginReq(values)
      : SignupReq(values));
    dispatch({ type: ACTIONS.LOADING, payload: false });
    if (response.data.success) {
      notifications.show({
        title: "Hey",
        message: response.data.message,
        color: "green",
      });
      Cookie.set("token", response.data.token);
      dispatch({ type: ACTIONS.AUTH, payload: response.data.data });
      dispatch({ type: ACTIONS.LOGINMODAL, payload: false });
      authType === "Login" ? loginForm.reset() : signupForm.reset();
    } else {
      notifications.show({
        title: "Oops",
        message: response.data.message,
        color: "red",
      });
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => dispatch({ type: ACTIONS.LOGINMODAL, payload: false })}
        title={"Authorization"}
      >
        <div className="tab">
          <SegmentedControl
            radius="xl"
            size="md"
            data={["Login", "Signup"]}
            classNames={classes}
            onChange={(e) => setAuthType(e)}
            color="red"
            value={authType}
          />
        </div>
        {authType === "Login" ? (
          <form onSubmit={loginForm.onSubmit((v) => handleSubmit(v))}>
            <TextInput
              withAsterisk
              label="Email"
              placeholder="ashish@abc.com"
              size="md"
              {...loginForm.getInputProps("email")}
            />
            <PasswordInput
              withAsterisk
              label="Password"
              placeholder="Your Password"
              mt="md"
              size="md"
              {...loginForm.getInputProps("password")}
            />
            <Button
              type="submit"
              fullWidth
              mt="xl"
              size="md"
              variant={"gradient"}
              gradient={{ from: "orange", to: "red" }}
            >
              Login
            </Button>
          </form>
        ) : (
          <form onSubmit={signupForm.onSubmit((v) => handleSubmit(v))}>
            <TextInput
              withAsterisk
              label="Your Name"
              placeholder="Ashish"
              size="md"
              {...signupForm.getInputProps("name")}
            />
            <TextInput
              withAsterisk
              label="Email"
              placeholder="ashish@abc.com"
              size="md"
              {...signupForm.getInputProps("email")}
            />
            <PasswordInput
              withAsterisk
              label="Password"
              placeholder="Your Password"
              mt="md"
              size="md"
              {...signupForm.getInputProps("password")}
            />
            <Button
              type="submit"
              fullWidth
              mt="xl"
              size="md"
              variant="gradient"
              gradient={{ from: "orange", to: "red" }}
            >
              Signup
            </Button>
          </form>
        )}
      </Modal>
    </>
  );
};

export default Login;
