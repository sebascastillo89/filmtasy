import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchAllFilms } from "../store/actions/index";
import FilmsBoard from "../components/films/FilmsBoard";
import * as FavsHelper from "../components/helpers/FavsHelper";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function Favourites({ getFilms }) {
  const { t } = useTranslation();

  useEffect(() => {
    getFilms();
  }, []); // eslint-disable-line

  function onClear(e) {
    e.preventDefault();
    FavsHelper.clearCache();
    alert(t("CacheRemoved"));
    getFilms();
  }

  return (
    <>
      <FilmsBoard onlyFav />
      <div>
        <Button
          className="clear-cache"
          onClick={(e) => onClear(e)}
          variant="secondary"
          size="lg"
          block
        >
          {t("ClearCache")}
        </Button>
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    getFilms: () => dispatch(fetchAllFilms()),
  };
};

export default connect(null, mapDispatchToProps)(Favourites);
