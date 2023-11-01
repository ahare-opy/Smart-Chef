import axios from 'axios';
import Router from 'next/router';
import React from 'react';
import baseURL from './baseURL';
import catchErrors from './catchErrors';
import cookie from 'js-cookie';

function isNumber(value) {
  return typeof value === 'number';
}

export const removeZero = (item) =>
  Object.keys(item)
    .filter((key) => item[key] !== 0 && isNumber(item[key]))
    .reduce((newObj, key) => Object.assign(newObj, { [key]: item[key] }), {});

export const removeNull = (item) =>
  Object.keys(item)
    .filter((key) => item[key] !== null)
    .reduce((newObj, key) => Object.assign(newObj, { [key]: item[key] }), {});

export default function Input({ objValue, onChange, index, deleteField }) {
  const { label, type, value } = objValue;
  return (
    <div className="input-group" style={{ display: 'flex', margin: '1rem 0' }}>
      <label
        htmlFor={label}
        style={{
          fontSize: '0.9rem',
          fontWeight: '700',
          marginBottom: '0.3rem',
        }}
      >
        {label}
      </label>
      <div className="input" style={{ width: '100%', display: 'flex' }}>
        <input
          type={type || 'text'}
          id={label}
          value={parseInt(value, 10) || ''}
          onChange={(e) => onChange(e, index)}
          style={{
            padding: '0.3rem 0.5rem',
            border: '1px solid rgba(0, 0, 0, 0.2)',
            width: '100%',
          }}
        />
        {/* Add this */}
        <div
          onClick={(e) => deleteField(e, index)}
          style={{
            padding: '0.5rem 1rem',
            background: '#e34728',
            marginLeft: '0.5rem',
            color: '#fff',
            fontWeight: '700',
            cursor: 'pointer',
          }}
        >
          X
        </div>
      </div>
    </div>
  );
}

export const setUpInventory = async (user, formValues, setMyInventory) => {
  let inventory = [];

  formValues.forEach((val) => {
    let b = {};
    b[val.label] = parseInt(val.value);

    inventory.push(b);
  });

  setMyInventory(inventory);

  try {
    const res = await axios.patch(`${baseURL}/api/v1/user/inventory`, {
      user,
      inventory,
    });

    user = JSON.parse(JSON.stringify(res.data.vUser));

    Router.reload();
  } catch (error) {
    const errorMsg = catchErrors(error);
  }
};

export const possibleRecipe = async (res, myInv) => {
  delete res._id;
  delete res.Name;
  delete res.diet;
  delete res.id;
  delete res.link;
  delete res.picture_link;
  delete res.type;
  delete res.servings;
  delete res.cook_time_min;

  delete myInv._id;
  delete myInv.Name;
  delete myInv.diet;
  delete myInv.id;
  delete myInv.link;
  delete myInv.picture_link;
  delete myInv.type;
  delete myInv.servings;
  delete myInv.cook_time_min;

  let n = Object.keys(res);
  let m = Object.keys(myInv);

  for (let i = 0; i < m.length; i++) {
    let n1 = m[i];

    //console.log(n1);

    if (Number(res[n1]) - Number(myInv[n1]) >= 0) {
      return false;
    }
  }

  return true;
};

export const searchMyRecipes = async (
  user,
  diet,
  time,
  type,
  serve,
  setRecipe
) => {
  try {
    let res = await axios.post(`${baseURL}/api/v1/recipe/my-recipe`, {
      diet,
      time,
      type,
      serve,
    });

    res = res.data.recipe;

    //setRecipe(res.data.recipe);

    let ingredientsName = JSON.parse(JSON.stringify(Object.keys(res)));

    //let ingredientsName = [ 'shrimp', 'chital_fish', 'almond', 'spinach', 'potato', 'cornstarch', 'green_chilli', 'paat_shaak', 'naga_chilli', 'red_chili', 'chilli_sauce', 'ginger', 'onion', 'garlic', 'salt', 'ghee', 'eggplant', 'lady_finger', 'turmeric_powder', 'sugar', 'honey', 'flour', 'vanilla_extract', 'chicken', 'mushroom', 'bbq_sauce', 'soy_sauce_', 'fish_oil', 'mustard_oil', 'red_chilli_flakes', 'cheese', 'cheese_powder', 'tomato', 'bun', 'beef', 'egg', 'black_salt', 'bread_crumb', 'baking_powder', 'black_pepper', 'coriander', 'tomato_sauce', 'lettuce', 'mutton', 'rice', 'moog_dal', 'bay_leaf', 'cardamom', 'cloves', 'cinnamon', 'cumin_powder', 'star_anise', 'panch_poran', 'red_chilli_powder', 'coriander_powder', 'garam_masala', 'vegetable_oil', 'walnut', 'ground_nut', 'cashew_nut', 'masoor_dal', 'carrot', 'flat_bean', 'duck', 'cauliflower', 'spring_onion', 'dried_shrimp', 'dried_laitta', 'dried_chepa', 'dried_churi', 'dried_kachki', 'yougurt', 'saffron', 'curry_powder', 'cabbage', 'chaat_masala', 'besan', 'chickpea_dal', 'kebab_spice', 'papaya', 'oats', 'yogurt', 'butter', 'vinegar', 'capsicum', 'kasuri_methi', 'mace', 'tangra', 'kala_zeera', 'sago', 'gourd', 'coconut', 'jaggery', 'semai', 'gur', 'milk', 'milk_powder', 'raisin', 'mola_fish', 'hilsha_fish', 'prawn', 'rohu_fish', 'katla_fish', 'green_banana', 'mustard', 'banana', 'green_grape', 'black_grape', 'strawberry', 'kiwi', 'pomegranate', 'apple', 'cream', 'whipped_cream', 'orange', 'katal', 'condensed_milk', 'spinach	almond', 'bitter_gourd', 'peas', 'chana_dal', 'matar_dal', 'pumpkin', 'snake_gourd', 'onion_flower', 'pointed_gourd', 'bottle_gourd', 'paprika', 'semolina', 'birayani_masala', 'olive_oil', 'rosemary', 'red_spinach', 'mustard_seed', 'rice_flour', 'cumin', 'cucumber', 'lemon', 'mint', 'chital_fish	shrimp', 'scallion', 'moolo', 'ginger_garlic_paste', 'white_pepper', 'vegetable_stock', 'long_beans', 'corn', 'toast_biscuit', 'tortilla_chips', 'bread', 'tea', 'mango', 'thai_soup_spice', 'lemon_grass', 'parshe_fish', 'onion_leaf', 'puffed_rice', 'tarmarind', 'noodle', 'chocolate', 'yeast', 'mayonnaise', 'watermelon', 'dragon_fruit'];

    let myInv = JSON.parse(JSON.stringify(user.inventory));

    for (let i = 0; i < ingredientsName.length; i++) {
      let a = ingredientsName[i];

      if (myInv[a] === undefined) {
        let b = {
          [a]: 0,
        };
        Object.assign(myInv, b);
      }
    }

    for (let i = 0; i < res.length; i++) {
      let ff = true;

      let aa = JSON.parse(JSON.stringify(res[i]));

      ff = await possibleRecipe(aa, myInv);

      if (!ff) {
        res.splice(i, 1);
      }
    }

    setRecipe(res);
  } catch (error) {
    const errorMsg = catchErrors(error);
  }
};

export const removeFromInventory = async (userInventory, user) => {
  try {
    for (let key in user.inventory) {
      user.inventory[key] -= userInventory[key];
      if (user.inventory[key] < 0) user.inventory[key] = 0;
      if (user.inventory[key] === null) user.inventory[key] = 0;
    }

    let inventory = {};

    Object.assign(inventory, user.inventory);
    let id = user._id;

    let res = await axios.patch(`${baseURL}/api/v1/user/subtract-inventory`, {
      inventory,
      id,
    });

    user.inventory = res.data.user;

    Router.reload();
  } catch (error) {
    const errorMsg = catchErrors(error);
  }
};

export const resetInventory = async (user) => {
  try {
    let res = await axios.patch(`${baseURL}/api/v1/user/reset-inventory`, {
      user,
    });

    Router.reload();
  } catch (error) {
    const errorMsg = catchErrors(error);
  }
};
