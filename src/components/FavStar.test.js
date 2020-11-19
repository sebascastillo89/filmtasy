import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import FavStar from "./FavStar";

configure({ adapter: new Adapter() });

describe("FavStar", () => {
  describe("Non fav film", () => {
    it("Render empty star", () => {
      const wrapper = shallow(<FavStar id="1" type="film" />);
      expect(wrapper.find("img").at(0).props().alt).toBe("emptyStar");
    });

    it("No render cause invalid id", () => {
      const wrapper = shallow(<FavStar id="NaN" type="film" />);
      expect(wrapper.isEmptyRender()).toBe(true);
    });

    it("Set as fav", () => {
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
    it("Render filled star", () => {
      localStorage.clear();
      expect(localStorage.getItem("filmtasy_favs_films")).toBe(null);
      expect(localStorage.getItem("filmtasy_favs_characters")).toBe(null);
      localStorage.setItem("filmtasy_favs_films", JSON.stringify([1]));
      const wrapper = shallow(<FavStar id="1" type="film" />);

      expect(wrapper.find("img").at(0).props().alt).toBe("filledStar");
    });

    it("Set as fav", () => {
      localStorage.clear();
      expect(localStorage.getItem("filmtasy_favs_films")).toBe(null);
      expect(localStorage.getItem("filmtasy_favs_characters")).toBe(null);
      localStorage.setItem("filmtasy_favs_films", JSON.stringify([1]));
      const wrapper = shallow(<FavStar id="1" type="film" />);

      expect(localStorage.getItem("filmtasy_favs_films")).toBe("[1]");
      expect(localStorage.getItem("filmtasy_favs_characters")).toBe(null);
      wrapper.find("img").simulate("click", {
        preventDefault: () => {},
      });
      expect(localStorage.getItem("filmtasy_favs_films")).toBe("[]");
      expect(localStorage.getItem("filmtasy_favs_characters")).toBe(null);
    });
  });

  describe("Non fav character", () => {
    it("Render empty star", () => {
      const wrapper = shallow(<FavStar id="1" type="character" />);

      expect(wrapper.find("img").at(0).props().alt).toBe("emptyStar");
    });

    it("Set as fav", () => {
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
    it("Render filled star", () => {
      localStorage.clear();
      expect(localStorage.getItem("filmtasy_favs_films")).toBe(null);
      expect(localStorage.getItem("filmtasy_favs_characters")).toBe(null);
      localStorage.setItem("filmtasy_favs_characters", JSON.stringify([1]));
      const wrapper = shallow(<FavStar id="1" type="character" />);

      expect(wrapper.find("img").at(0).props().alt).toBe("filledStar");
    });

    it("Set as fav", () => {
      localStorage.clear();
      expect(localStorage.getItem("filmtasy_favs_films")).toBe(null);
      expect(localStorage.getItem("filmtasy_favs_characters")).toBe(null);
      localStorage.setItem("filmtasy_favs_characters", JSON.stringify([1]));
      const wrapper = shallow(<FavStar id="1" type="character" />);

      expect(localStorage.getItem("filmtasy_favs_characters")).toBe("[1]");
      expect(localStorage.getItem("filmtasy_favs_films")).toBe(null);
      wrapper.find("img").simulate("click", {
        preventDefault: () => {},
      });
      expect(localStorage.getItem("filmtasy_favs_characters")).toBe("[]");
      expect(localStorage.getItem("filmtasy_favs_films")).toBe(null);
    });
  });
});
