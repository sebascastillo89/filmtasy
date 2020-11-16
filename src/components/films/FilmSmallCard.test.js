import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import FilmSmallCard from "./FilmSmallCard";
import { Card } from "react-bootstrap";

configure({ adapter: new Adapter() });

describe("Film small card", () => {
  it("Render link", () => {
    const wrapper = shallow(
      <FilmSmallCard title="Title" subtitle="Subtitle" src="" id="1" />
    );
    expect(wrapper.find(Card.Link).at(0).props().href).toBe("films/1");
  });
});
