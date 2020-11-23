import React from "react";
import { shallow } from "enzyme";
import FilmSmallCard from "./FilmSmallCard";

describe("Film small card", () => {
  it("When mount component, then show film data", () => {
    const wrapper = shallow(
      <FilmSmallCard title="MyTitle" subtitle="MySubtitle" src="" id="1" />
    );

    expect(wrapper.find("CardTitle").at(0).props().children).toBe("MyTitle");
    expect(wrapper.find("CardText").at(0).props().children).toBe("MySubtitle");
    expect(wrapper.find("FavStar").at(0).props().id).toBe("1");
  });
});
