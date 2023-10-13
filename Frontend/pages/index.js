import React, { useEffect, useState } from 'react';
import baseUrl from '../utils/baseUrl';
import axios from 'axios';
import CardRecipe from '../components/Recipe/CardRecipe';
import { Card } from 'semantic-ui-react'
 
function index(){
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        (async () => {
            let res;

            try{
                res = await axios.get(`${baseUrl}/api/v1/recipe`);

                setRecipes(res.data.recipe);
            } catch (error) {
                console.log(error);
                ('Error Searching Complains');
              }
        })();
    })

    return(
        <div>
            <Card.Group divider>
                {recipes.map((recipe) => (
                    <CardRecipe
                        recipe={recipe}
                    />
                ))}
            </Card.Group>
        </div>
    );
}

export default index;