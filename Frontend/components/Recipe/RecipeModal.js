import React, { useEffect, useState } from 'react';
import {
  Container,
  Divider,
  Header,
  Icon,
  Label,
  Grid,
} from 'semantic-ui-react';
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';

import { removeZero } from '../../utils/recipe';

import axios from 'axios';

function RecipeModal({ recipe }) {
  const [iconName, setIconName] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [ingredients2, setIngredients2] = useState([]);
  const [result, setResult] = useState('');
  const [color, setColor] = useState('');

  useEffect(() => {
    (async () => {
      let servingSize = recipe.servings;
      let dairyProduct =
        recipe.ghee +
        recipe.cheese +
        recipe.cheese_powder +
        recipe.yougurt +
        recipe.yogurt +
        recipe.butter +
        recipe.milk +
        recipe.milk_powder +
        recipe.condensed_milk +
        recipe.chocolate +
        recipe.mayonnaise;
      let salt = recipe.salt + recipe.black_salt;
      let potato = recipe.potato;
      let vegetables =
        recipe.paat_shaak +
        recipe.eggplant +
        recipe.lady_finger +
        recipe.mushroom +
        recipe.tomato +
        recipe.coriander +
        recipe.lettuce +
        recipe.bay_leaf +
        recipe.carrot +
        recipe.flat_bean +
        recipe.cauliflower +
        recipe.spring_onion +
        recipe.cabbage +
        recipe.capsicum +
        recipe.green_banana +
        recipe.banana +
        recipe.spinach +
        recipe.bitter_gourd +
        recipe.pumpkin +
        recipe.snake_gourd +
        recipe.pointed_gourd +
        recipe.bottle_gourd +
        recipe.red_spinach +
        recipe.cucumber +
        recipe.scallion +
        recipe.moolo +
        recipe.long_beans +
        recipe.corn;
      let sugar = recipe.sugar + recipe.honey + recipe.gur;
      let chicken = recipe.chicken + recipe.duck;
      let oil =
        recipe.fish_oil +
        recipe.mustard_oil +
        recipe.vegetable_oil +
        recipe.olive_oil;
      let beef = recipe.beef;
      let fruits =
        recipe.papaya +
        recipe.green_grape +
        recipe.black_grape +
        recipe.strawberry +
        recipe.kiwi +
        recipe.pomegranate +
        recipe.apple +
        recipe.orange +
        recipe.katal +
        recipe.mango +
        recipe.watermelon +
        recipe.dragon_fruit;
      let egg = recipe.egg;
      let mutton = recipe.mutton;
      let rice = recipe.rice;
      let carbs =
        recipe.cornstarch +
        recipe.flour +
        recipe.bun +
        recipe.bread_crumb +
        recipe.baking_powder +
        recipe.moog_dal +
        recipe.masoor_dal +
        recipe.chickpea_dal +
        recipe.oats +
        recipe.sago +
        recipe.semai +
        recipe.peas +
        recipe.chana_dal +
        recipe.matar_dal +
        recipe.semolina +
        recipe.rice_flour +
        recipe.bread +
        recipe.noodle;
      let fish =
        recipe.tangra +
        recipe.mola_fish +
        recipe.hilsha_fish +
        recipe.prawn +
        recipe.rohu_fish +
        recipe.katla_fish +
        recipe.chital_fish +
        recipe.shrimp +
        recipe.parshe_fish;
      let driedFish =
        recipe.dried_shrimp +
        recipe.dried_laitta +
        recipe.dried_chepa +
        recipe.dried_churi +
        recipe.dried_kachki;

      try {
        const response = await axios.post('http://127.0.0.1:5000/predict/', {
          servingSize,
          dairyProduct,
          salt,
          potato,
          vegetables,
          sugar,
          chicken,
          oil,
          beef,
          fruits,
          egg,
          mutton,
          rice,
          carbs,
          fish,
          driedFish,
        });

        if (response.data.result == 0) {
          setIconName('ban');
          setResult('Less Healthy');
          setColor('red');
        } else {
          setIconName('check circle');
          setResult('Healthy');
          setColor('green');
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [setIconName, setResult, setColor]);

  useEffect(() => {
    (async () => {
      //let ingredientsName = ['Name', 'cook_time_min', 'diet', 'servings', 'picture_link', 'type', 'link', 'potato', 'cornstarch', 'green_chilli', 'paat_shaak', 'naga_chilli', 'red_chili', 'chilli_sauce', 'ginger', 'onion', 'garlic', 'salt', 'ghee', 'eggplant', 'lady_finger', 'turmeric_powder', 'sugar', 'honey', 'flour', 'vanilla_extract', 'chicken', 'mushroom', 'bbq_sauce', 'soy_sauce_', 'fish_oil', 'mustard_oil', 'red_chilli_flakes', 'cheese', 'cheese_powder', 'tomato', 'bun', 'beef', 'egg', 'black_salt', 'bread_crumb', 'baking_powder', 'black_pepper', 'coriander', 'tomato_sauce', 'lettuce', 'mutton', 'rice', 'moog_dal', 'bay_leaf', 'cardamom', 'cloves', 'cinnamon', 'cumin_powder', 'star_anise', 'panch_poran', 'red_chilli_powder', 'coriander_powder', 'garam_masala', 'vegetable_oil', 'walnut', 'ground_nut', 'cashew_nut', 'masoor_dal', 'carrot', 'flat_bean', 'duck', 'cauliflower', 'spring_onion', 'dried_shrimp', 'dried_laitta', 'dried_chepa', 'dried_churi', 'dried_kachki', 'yougurt', 'saffron', 'curry_powder', 'cabbage', 'chaat_masala', 'besan', 'chickpea_dal', 'kebab_spice', 'papaya', 'oats', 'yogurt', 'butter', 'vinegar', 'capsicum', 'kasuri_methi', 'mace', 'tangra', 'kala_zeera', 'sago', 'gourd', 'coconut', 'jaggery', 'semai', 'gur', 'milk', 'milk_powder', 'raisin', 'mola_fish', 'hilsha_fish', 'prawn', 'rohu_fish', 'katla_fish', 'green_banana', 'mustard', 'banana', 'green_grape', 'black_grape', 'strawberry', 'kiwi', 'pomegranate', 'apple', 'cream', 'whipped_cream', 'orange', 'katal', 'condensed_milk', 'spinach	almond', 'bitter_gourd', 'peas', 'chana_dal', 'matar_dal', 'pumpkin', 'snake_gourd', 'onion_flower', 'pointed_gourd', 'bottle_gourd', 'paprika', 'semolina', 'birayani_masala', 'olive_oil', 'rosemary', 'red_spinach', 'mustard_seed', 'rice_flour', 'cumin', 'cucumber', 'lemon', 'mint', 'chital_fish	shrimp', 'scallion', 'moolo', 'ginger_garlic_paste', 'white_pepper', 'vegetable_stock', 'long_beans', 'corn', 'toast_biscuit', 'tortilla_chips', 'bread', 'tea', 'mango', 'thai_soup_spice', 'lemon_grass', 'parshe_fish', 'onion_leaf', 'puffed_rice', 'tarmarind', 'noodle', 'chocolate', 'yeast', 'mayonnaise', 'watermelon', 'dragon_fruit'];

      let  rr = JSON.parse(JSON.stringify(recipe));

      delete rr._id;
      delete rr.Name;
      delete rr.cook_time_min;
      delete rr.diet;
      delete rr.servings;
      delete rr.picture_link;
      delete rr.type;
      delete rr.link;

      let rrecipe = removeZero(rr);

      var ingredientsName = [];
      var ingredientsValue = [];

      ingredientsName = Object.keys(rrecipe);
      ingredientsValue = Object.values(rrecipe);

      setIngredients(ingredientsName);
      setIngredients2(ingredientsValue);
    })();
  }, [setIngredients, setIngredients2]);

  return (
    <Container>
      <Header as="h1" textAlign="center">
        {recipe.Name}
      </Header>
      <Divider hidden />
      <Divider hidden />
      <Table style={{ border: '1' }}>
        <TableBody>
          <TableRow>
            <TableCell align="left">
              <Icon loading name="clock" />
              {recipe.cook_time_min}min
            </TableCell>
            <TableCell align="center">
              <Icon name="user" />
              {recipe.servings}persons
            </TableCell>
            <TableCell align="center">
              <Icon name="food" />
              {recipe.diet}
            </TableCell>
            <TableCell align="right">
              <Icon name={iconName} color={color}></Icon>
              <Label basic color={color}>
                {result}
              </Label>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Divider hidden />
      <Divider hidden />
      <Stack direction="row">
        <Box sx={{ border: 1 }}>
          <Table style={{ width: '10%' }}>
            <TableBody>
              {ingredients.map((ingredient) => (
                <TableRow>
                  <TableCell>{ingredient}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        <Box sx={{ border: 1, borderLeft: 0 }}>
          <Table style={{ width: '10%' }}>
            <TableBody>
              {ingredients2.map((ingredient2) => (
                <TableRow>
                  <TableCell>{ingredient2}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Stack>
      <Divider hidden />
      <Divider hidden />
      {recipe.video_link ? (
        <div class="ratio ration-16x9">
          <iframe
            src={recipe.video_link}
            title={recipe.Name}
            allowFullScreen
            style={{ width: '100%', height: '500px' }}
          />
        </div>
      ) : (
        <div class="ratio ration-16x9">
          <iframe
            src="https://www.youtube.com/embed/r6VFKDdjohg?si=899EltFd7LHcMYjm"
            title={recipe.Name}
            allowFullScreen
            style={{ width: '100%', height: '500px' }}
          />
        </div>
      )}
      ;
    </Container>
  );
}

export default RecipeModal;
