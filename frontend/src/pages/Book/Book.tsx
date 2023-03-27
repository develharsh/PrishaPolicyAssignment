import React, { ReactElement } from "react";
import { GetSpecificBook, ACTIONS } from "../../store/actions";
import { IBook, IGlobalState } from "../../utils/types";
import "./Book.css";
import { DataContext } from "../../store/globalstate";
import { notifications } from "@mantine/notifications";
import { BASE_URL } from "../../utils/hardcoded";
import { useParams, useNavigate, NavigateFunction } from "react-router-dom";
import { Progress } from "@mantine/core";

interface props {}

interface MorethanIBook extends IBook {
  inFavourite?: boolean;
  rating?: {
    avgRating?: string;
    reviewCount?: number;
    recommendation?: string;
    individualPerc?: any;
  };
}

interface bookProps {
  book: MorethanIBook | null;
  navigate: NavigateFunction;
}

const Book: React.FC<props> = (): ReactElement => {
  const [book, setBook] = React.useState<MorethanIBook | null>(null);

  const { state, dispatch } = React.useContext<IGlobalState>(DataContext);

  const { _id } = useParams<string>();

  const navigate: NavigateFunction = useNavigate();

  React.useEffect(() => {
    if (state?.user) fetchBook(setBook, dispatch, _id);
  }, [state?.user]);

  return <>{book && <BookComponent book={book} navigate={navigate} />}</>;
};

const BookComponent: React.FC<bookProps> = ({
  book,
  navigate,
}): ReactElement => {
  return (
    <div className="book">
      <div className="navigate">
        <button className="backbtn" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
      <div className="main">
        <div className="cover-block">
          <img
            src={`${BASE_URL}/${book?.coverFile}`}
            alt="Prisha Book Cover Image"
            className="cover"
          />
        </div>
        <div className="content-block">
          <div className="typography">
            <p className="title">{book?.title}</p>
            <p className="author">{book?.author}</p>
            <p className="book-read-time">
              Book Read Time: {book?.bookReadTime} mins.
            </p>
            <p className="desc">
              {/* When astronauts blast off from planet Mars, they leave behind Mark
              Watney(Matt Demon), presumed dead after a fierce storm. With only
              a meager amount of supplies, the standard visitor must utilize his
              wits and spirit to find a way to survive on the hostile planet.
              Meanwhile, back on Earth, members of NASA and a team of
              international scientists work tirelessly to bring him home, which
              is crew mates hatch their own plan for a daring rescue mission. */}
              {book?.description}
            </p>
          </div>
          <div className="action">
            <div className="firstblock">
              <div className="summary">
                <p className="message">Summary</p>
                <div className="blocks">
                  <div className="firstblock">
                    {[5, 4, 3, 2, 1].map((each: number, idx: number) => (
                      <div className="block" key={idx}>
                        <p className="number">{each}</p>{" "}
                        <Progress
                          color="yellow"
                          value={book?.rating?.individualPerc[each.toString()]}
                          radius="xl"
                          style={{ width: "120px" }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="secondblock"></div>
                </div>
              </div>
              <div className="rating">
                <p className="message">
                  You have not rated this book yet. Click on the button to start
                  rating.
                </p>
                <button className="ratingbtn">Rate this Book</button>
              </div>
            </div>
            <div className="secondblock">
              <button
                className="readbtn"
                onClick={() =>
                  window.open(`${BASE_URL}/${book?.pdfFile}`, "_blank")
                }
              >
                Read this Book
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const fetchBook = async (
  setBook: React.Dispatch<React.SetStateAction<MorethanIBook | null>>,
  dispatch: any,
  _id: string | undefined
): Promise<any> => {
  dispatch({ type: ACTIONS.LOADING, payload: true });
  const response = await GetSpecificBook(_id);
  dispatch({ type: ACTIONS.LOADING, payload: false });
  if (response.data.success) {
    setBook(response.data.data);
  } else {
    notifications.show({
      title: "Oops",
      message: response.data.message,
      color: "red",
    });
  }
};

export default Book;
