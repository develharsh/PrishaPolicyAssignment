import React, { ReactElement } from "react";
import { GetFavourites, ACTIONS } from "../../store/actions";
import { IBook, IGlobalState } from "../../utils/types";
import "./Favourites.css";
import { DataContext } from "../../store/globalstate";
import { notifications } from "@mantine/notifications";
import { BsJournalBookmarkFill } from "react-icons/bs";
import { BASE_URL } from "../../utils/hardcoded";
import { useNavigate } from "react-router-dom";

interface props {}

const Favourites: React.FC<props> = (): ReactElement => {
  const [books, setBooks] = React.useState<IBook[]>([]);

  const { state, dispatch } = React.useContext<IGlobalState>(DataContext);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (state?.user) fetchFavouritesBooks(setBooks, dispatch);
  }, [state?.user]);

  return (
    <>
      <div className="favs">
        <p className="title">
          <span>
            <BsJournalBookmarkFill />
          </span>{" "}
          My Favourite
        </p>
      </div>
      <div className="favs-books">
        {books.map((each: IBook, index: number) => (
          <div
            className="book"
            key={index}
            onClick={() => navigate(`/book/${each._id}`)}
          >
            <img
              src={`${BASE_URL}/${each.coverFile}`}
              alt="Prisha Book Cover"
              className="cover"
            />
            <p className="title">{each.title}</p>
            <p className="author">{each.author}</p>
          </div>
        ))}
      </div>
    </>
  );
};

const fetchFavouritesBooks = async (
  setBooks: React.Dispatch<React.SetStateAction<IBook[]>>,
  dispatch: any
): Promise<any> => {
  dispatch({ type: ACTIONS.LOADING, payload: true });
  const response = await GetFavourites();
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

export default Favourites;
