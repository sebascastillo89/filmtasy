import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import FilmSmallCard from "./FilmSmallCard";

configure({ adapter: new Adapter() });

describe("Film small card", () => {
  it("Render link", () => {
    const wrapper = shallow(
      <FilmSmallCard title="MyTitle" subtitle="MySubtitle" src="" id="1" />
    );

    expect(wrapper.find("CardTitle").at(0).props().children).toBe("MyTitle");
    expect(wrapper.find("CardText").at(0).props().children).toBe("MySubtitle");
    expect(wrapper.find("FavStar").at(0).props().id).toBe("1");
    expect(wrapper.find("CardLink").at(0).props().href).toBe("films/1");
  });
});
