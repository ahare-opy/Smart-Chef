import React from 'react';

import { Card, Image, Icon, Divider, Tab } from 'semantic-ui-react';

function CardRecipe({recipe}) {

    return(
        <div>
            <Card>
                <Image src={recipe.picture_link} wrapped ui={false} size ="small" loading="lazy"/>
                <Card.Header>{recipe.Name}</Card.Header>
                <Card.Content extra>
                    <a floated="left">
                        <Icon name='clock' />
                        Cook Time: {recipe.cook_time_min}
                    </a>
                    <a floated="right">
                        <Icon name='user' />
                        Servings: {recipe.servings}
                    </a>
                </Card.Content>
            </Card>

            <Divider/>
        </div>
    )
}

export default CardRecipe;