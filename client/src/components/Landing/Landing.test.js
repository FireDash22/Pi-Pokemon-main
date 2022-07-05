import LandingPage from "./Landing.jsx";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() });

describe("<LangindPage />", () => {
  let land;

  beforeEach(() => {
    land = shallow(<LandingPage />);
  });

  it('Debería rederizar un "h1" con el texto "Bienvenido a la Wiki de Pokemons"', () => {
    expect(land.find("h1").at(0).text()).toEqual(
      "Bienvenido a la Wiki de Pokemons"
    );
  });

  it('Debería renderizar un "button"', () => {
    expect(land.find("button").text()).toEqual("Ingresar");
  });
});