import React, { ReactElement } from "react";
import { GetAllBooks, ACTIONS } from "../../store/actions";
import { IBook, IGlobalState } from "../../utils/types";
import "./Home.css";
import { DataContext } from "../../store/globalstate";
import { notifications } from "@mantine/notifications";
import { BsJournalBookmarkFill } from "react-icons/bs";
import { BASE_URL } from "../../utils/hardcoded";

interface props {}

const Home: React.FC<props> = (): ReactElement => {
  const [books, setBooks] = React.useState<IBook[]>([]);

  const { state, dispatch } = React.useContext<IGlobalState>(DataContext);

  React.useEffect(() => {
    if (state?.user) fetchBooks(setBooks, dispatch);
  }, [state?.user]);

  return (
    <>
      <div className="home">
        <p className="title">
          <span>
            <BsJournalBookmarkFill />
          </span>{" "}
          My Books
        </p>
      </div>
      <div className="home-books">
        {books.map((each: IBook, index: number) => (
          <div className="book" key={index}>
            <img
              src={`${BASE_URL}/${each.coverFile}`}
              alt="Prisha Book Cover"
              className="cover"
            />
            <p className="title">{each.title}</p>
            <p className="author">{each.author}</p>
          </div>
        ))}
        <div className="upload">
          <p className="first">+</p>
          <p className="second">Add a Book</p>
        </div>
      </div>
    </>
  );
};

const fetchBooks = async (
  setBooks: React.Dispatch<React.SetStateAction<IBook[]>>,
  dispatch: any
): Promise<any> => {
  dispatch({ type: ACTIONS.LOADING, payload: true });
  const response = await GetAllBooks();
  dispatch({ type: ACTIONS.LOADING, payload: false });
  if (response.data.success) {
    setBooks(response.data.data);
  } else {
    notifications.show({
      title: "Oops",
      message: response.data.message,
      color: "red",
    });
  }
};

export default Home;
