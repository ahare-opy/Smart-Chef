import React, { useEffect, useState } from 'react';
import baseURL from '../utils/baseURL';
import axios from 'axios';
import CardRecipe from '../components/Recipe/CardRecipe';
import { Card, Divider } from 'semantic-ui-react';

function index() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    (async () => {
      let res;

      try {
        res = await axios.get(`${baseURL}/api/v1/recipe`);

        setRecipes(res.data.recipe);
      } catch (error) {
        console.log(error);
        ('Error Searching Complains');
      }
    })();
  }, [recipes]);

  return (
    <div>
      <Card.Group divider>
        {recipes.map((recipe) => (
          <CardRecipe recipe={recipe} />
        ))}
      </Card.Group>
    </div>
  );
}

export default index;
