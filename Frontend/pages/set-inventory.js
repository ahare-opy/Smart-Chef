import React, { useState, useRef, useEffect } from 'react';
import { Dropdown } from 'semantic-ui-react';
import Input, { setUpInventory } from '../utils/recipe';
//import "../public/inventory.css";

function Inventory({ user }) {
  const [formValues, setFormValues] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [ingredientOptions, setIngredientOptions] = useState([]);
  const [myInventory, setMyInventory] = useState([]);

  const inputRef = useRef();
  const selectRef = useRef();

  useEffect(() => {
    let ingredientsName = [
      'shrimp',
      'chital_fish',
      'almond',
      'spinach',
      'potato',
      'cornstarch',
      'green_chilli',
      'paat_shaak',
      'naga_chilli',
      'red_chili',
      'chilli_sauce',
      'ginger',
      'onion',
      'garlic',
      'salt',
      'ghee',
      'eggplant',
      'lady_finger',
      'turmeric_powder',
      'sugar',
      'honey',
      'flour',
      'vanilla_extract',
      'chicken',
      'mushroom',
      'bbq_sauce',
      'soy_sauce_',
      'fish_oil',
      'mustard_oil',
      'red_chilli_flakes',
      'cheese',
      'cheese_powder',
      'tomato',
      'bun',
      'beef',
      'egg',
      'black_salt',
      'bread_crumb',
      'baking_powder',
      'black_pepper',
      'coriander',
      'tomato_sauce',
      'lettuce',
      'mutton',
      'rice',
      'moog_dal',
      'bay_leaf',
      'cardamom',
      'cloves',
      'cinnamon',
      'cumin_powder',
      'star_anise',
      'panch_poran',
      'red_chilli_powder',
      'coriander_powder',
      'garam_masala',
      'vegetable_oil',
      'walnut',
      'ground_nut',
      'cashew_nut',
      'masoor_dal',
      'carrot',
      'flat_bean',
      'duck',
      'cauliflower',
      'spring_onion',
      'dried_shrimp',
      'dried_laitta',
      'dried_chepa',
      'dried_churi',
      'dried_kachki',
      'yougurt',
      'saffron',
      'curry_powder',
      'cabbage',
      'chaat_masala',
      'besan',
      'chickpea_dal',
      'kebab_spice',
      'papaya',
      'oats',
      'yogurt',
      'butter',
      'vinegar',
      'capsicum',
      'kasuri_methi',
      'mace',
      'tangra',
      'kala_zeera',
      'sago',
      'gourd',
      'coconut',
      'jaggery',
      'semai',
      'gur',
      'milk',
      'milk_powder',
      'raisin',
      'mola_fish',
      'hilsha_fish',
      'prawn',
      'rohu_fish',
      'katla_fish',
      'green_banana',
      'mustard',
      'banana',
      'green_grape',
      'black_grape',
      'strawberry',
      'kiwi',
      'pomegranate',
      'apple',
      'cream',
      'whipped_cream',
      'orange',
      'katal',
      'condensed_milk',
      'spinach	almond',
      'bitter_gourd',
      'peas',
      'chana_dal',
      'matar_dal',
      'pumpkin',
      'snake_gourd',
      'onion_flower',
      'pointed_gourd',
      'bottle_gourd',
      'paprika',
      'semolina',
      'birayani_masala',
      'olive_oil',
      'rosemary',
      'red_spinach',
      'mustard_seed',
      'rice_flour',
      'cumin',
      'cucumber',
      'lemon',
      'mint',
      'chital_fish	shrimp',
      'scallion',
      'moolo',
      'ginger_garlic_paste',
      'white_pepper',
      'vegetable_stock',
      'long_beans',
      'corn',
      'toast_biscuit',
      'tortilla_chips',
      'bread',
      'tea',
      'mango',
      'thai_soup_spice',
      'lemon_grass',
      'parshe_fish',
      'onion_leaf',
      'puffed_rice',
      'tarmarind',
      'noodle',
      'chocolate',
      'yeast',
      'mayonnaise',
      'watermelon',
      'dragon_fruit',
    ];

    let b = [];

    ingredientsName.forEach((ing) => {
      let a = {
        key: ing,
        text: ing,
        value: ing,
      };

      b.push(a);
    });

    setIngredientOptions(b);
  }, [ingredientOptions]);

  const handleChange = (e, index) => {
    const values = [...formValues];
    values[index].value = e.target.value;
    setFormValues(values);
  };

  const handleAddField = (e) => {
    e.preventDefault();
    const values = [...formValues];
    values.push({
      label: inputRef.current.value || 'label',
      type: selectRef.current.value || 'text',
      value: '',
    });
    setFormValues(values);
    setToggle(false);
  };

  const handleDeleteField = (e, index) => {
    const values = [...formValues];
    values.splice(index, 1);
    setFormValues(values);
  };

  const addBtnClick = (e) => {
    e.preventDefault();
    setToggle(true);
  };

  const handleDropChange = (e, { value }) => {
    e.preventDefault();
    inputRef.current.value = value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setUpInventory(user, formValues, setMyInventory);
  };

  return (
    <div className="App">
      <form
        onSubmit={handleSubmit}
        style={{
          margin: '3rem auto',
          width: '500px',
          padding: '1rem',
          border: '1px solid rgba(0, 0, 0, 0.1)',
        }}
      >
        {formValues.map((obj, index) => (
          <Input
            key={index}
            objValue={obj}
            onChange={handleChange}
            index={index}
            // Add this
            deleteField={handleDeleteField}
          />
        ))}
        {!toggle ? (
          <div
            className="center"
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <button
              className="add-btn"
              onClick={addBtnClick}
              style={{
                padding: '0.5rem 1rem',
                background: '#ccc',
                border: 'none',
                fontSize: '0.9rem',
                color: '#fff',
                fontWeight: '700',
                cursor: 'pointer',
              }}
            >
              Add new
            </button>
          </div>
        ) : (
          <div
            className="dialog-box"
            style={{
              margin: '0.5rem 0',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(4rem, 1fr))',
              gridGap: '1rem',
            }}
          >
            <Dropdown
              placeholder="Ingredients"
              fluid
              search
              selection
              onChange={handleDropChange}
              options={ingredientOptions}
            />
            <input
              type="text"
              placeholder="label"
              ref={inputRef}
              required
              style={{
                padding: '0.5rem 0.5rem',
                border: '1px solid rgba(0, 0, 0, 0.2)',
              }}
            />
            <select
              ref={selectRef}
              style={{
                padding: '0.5rem 0.5rem',
                border: '1px solid rgba(0, 0, 0, 0.2)',
              }}
            >
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="email">Email</option>
              <option value="password">Password</option>
            </select>
            <button
              className="add-btn"
              onClick={handleAddField}
              style={{
                padding: '0.5rem 1rem',
                background: '#ccc',
                border: 'none',
                fontSize: '0.9rem',
                color: '#fff',
                fontWeight: '700',
                cursor: 'pointer',
              }}
            >
              Add
            </button>
          </div>
        )}
        <button
          type="submit"
          className="submit-btn"
          style={{
            width: '100%',
            padding: '0.5rem 1rem',
            border: '1px solid #e34728',
            background: '#fff',
            margin: '1.2rem 0',
            color: '#e34728',
            fontSize: '0.9rem',
            fontWeight: '700',
            cursor: 'pointer',
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
export default Inventory;
