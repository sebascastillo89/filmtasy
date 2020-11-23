import React from "react";
import { shallow } from "enzyme";
import FavStar from "./FavStar";

describe("FavStar", () => {
  describe("Non fav film", () => {
    it("When non-fav film id is specified, then render empty star", () => {
      const wrapper = shallow(<FavStar id="1" type="film" />);
      expect(wrapper.find("img").at(0).props().alt).toBe("emptyStar");
    });

    it("When non-fav film id is specified, then render empty star (invalid id case)", () => {
      const wrapper = shallow(<FavStar id="NaN" type="film" />);
      expect(wrapper.isEmptyRender()).toBe(true);
    });

    it("When click no empy star, the add film to local storage", () => {
      localStorage.clear();
      const wrapper = shallow(<FavStar id="1" type="film" />);

      expect(localStorage.getItem("filmtasy_favs_films")).toBe(null);
      expect(localStorage.getItem("filmtasy_favs_characters")).toBe(null);
      wrapper.find("img").simulate("click", {
        preventDefault: () => {},
      });
      expect(localStorage.getItem("filmtasy_favs_films")).toBe("[1]");
      expect(localStorage.getItem("filmtasy_favs_characters")).toBe(null);
    });
  });

  describe("Fav film", () => {
    let wrapper;
    beforeEach(() => {
      localStorage.clear();
      expect(localStorage.getItem("filmtasy_favs_films")).toBe(null);
      expect(localStorage.getItem("filmtasy_favs_characters")).toBe(null);
      localStorage.setItem("filmtasy_favs_films", JSON.stringify([1]));
      wrapper = shallow(<FavStar id="1" type="film" />);
      expect(localStorage.getItem("filmtasy_favs_films")).toBe("[1]");
    });

    it("When fav film id is specified, then render filled star", () => {
      expect(wrapper.find("img").at(0).props().alt).toBe("filledStar");
    });

    it("When click on fav star, then remove film from local storage", () => {
      wrapper.find("img").simulate("click", {
        preventDefault: () => {},
      });
      expect(localStorage.getItem("filmtasy_favs_films")).toBe("[]");
      expect(localStorage.getItem("filmtasy_favs_characters")).toBe(null);
    });
  });

  describe("Non fav character", () => {
    it("When non-fav character id is specified, then render empty star", () => {
      const wrapper = shallow(<FavStar id="1" type="character" />);

      expect(wrapper.find("img").at(0).props().alt).toBe("emptyStar");
    });

    it("When click no empy star, then add film to local storage", () => {
      localStorage.clear();
      const wrapper = shallow(<FavStar id="1" type="character" />);

      expect(localStorage.getItem("filmtasy_favs_films")).toBe(null);
      expect(localStorage.getItem("filmtasy_favs_characters")).toBe(null);
      wrapper.find("img").simulate("click", {
        preventDefault: () => {},
      });
      expect(localStorage.getItem("filmtasy_favs_characters")).toBe("[1]");
      expect(localStorage.getItem("filmtasy_favs_films")).toBe(null);
    });
  });

  describe("Fav character", () => {
    let wrapper;
    beforeEach(() => {
      localStorage.clear();
      expect(localStorage.getItem("filmtasy_favs_films")).toBe(null);
      expect(localStorage.getItem("filmtasy_favs_characters")).toBe(null);
      localStorage.setItem("filmtasy_favs_characters", JSON.stringify([1]));
      wrapper = shallow(<FavStar id="1" type="character" />);
      expect(localStorage.getItem("filmtasy_favs_characters")).toBe("[1]");
      expect(localStorage.getItem("filmtasy_favs_films")).toBe(null);
    });

    it("When fav char id is specified, then render filled star", () => {
      expect(wrapper.find("img").at(0).props().alt).toBe("filledStar");
    });

    it("When click on fav star, then remove film from local storage", () => {
      wrapper.find("img").simulate("click", {
        preventDefault: () => {},
      });
      expect(localStorage.getItem("filmtasy_favs_characters")).toBe("[]");
      expect(localStorage.getItem("filmtasy_favs_films")).toBe(null);
    });
  });
});
