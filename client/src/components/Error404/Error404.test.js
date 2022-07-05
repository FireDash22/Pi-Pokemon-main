import Error404 from "./Error404.jsx";
import { Link } from "react-router-dom"; 
import renderer from 'react-test-renderer';
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() });

describe("<Error404 />", () => {
  let land;

  beforeEach(() => {
    land = shallow(<Error404 />);
  });

  it('Debería rederizar un "h1" con el texto "404"', () => {
    expect(land.find("h1").at(0).text()).toEqual(
      "404"
    );
  });
  it('Debería rederizar un "h2" con el texto "UPS!!! El direccionamiento no es correcto."', () => {
    expect(land.find("h2").at(0).text()).toEqual(
      "UPS!!! El direccionamiento no es correcto."
    );
  });
  it('Deberia renderizar un "Link" con el texto que diga "HOME"', async () => {
    const comp = renderer.create(
      <Link to="/home"><button>HOME</button></Link>
  );
  const wrapper = shallow( comp );
  expect(wrapper.instance().props.to).to.equal("/home");
  } )
  it('Debería rederizar un "p" con el texto "ERR: Page Not Found', () => {
    expect(land.find("p").at(1).text()).toEqual(
      "ERR: Page Not Found"
    );
  });
  
});