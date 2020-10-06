import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';


configure({ adapter: new Adapter() });

describe('<BurgerBuilder />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />);
    });
    it('should render <BuildControls /> if and only if receiving ingredients', () => {
        wrapper.setProps({ings: {salad: 0}, ingPrices: {salad: 0.5, bacon: 0.5, cheese: 0.5, meat: 0.5}
        });
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});