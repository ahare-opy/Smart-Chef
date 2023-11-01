import React, { useState } from 'react';
import {
  Card,
  Image,
  Icon,
  Divider,
  Table,
  Button,
  Modal,
} from 'semantic-ui-react';

import MyRecipeModal from './MyRecipeModal';

function CardMyRecipe({ recipe, user }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <Card>
        <Image
          src={recipe.picture_link}
          style={{ width: 'auto', height: '250px' }}
        />
        <Card.Content extra>
          <Table>
            <Table.Body>
              <Table.Row>
                <Table.Cell textAlign="center" colspan="2">
                  {recipe.Name}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Icon loading name="clock" />
                  {recipe.cook_time_min}min
                </Table.Cell>
                <Table.Cell textAlign="right">
                  <Icon name="user" />
                  {recipe.servings}persons
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Icon name="food" />
                  {recipe.diet}
                </Table.Cell>
                <Table.Cell textAlign="right">
                  <Button
                    color="teal"
                    onClick={() => {
                      setShowModal(true);
                    }}
                  >
                    <Icon name="book" />
                    Details
                  </Button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Card.Content>
      </Card>

      {showModal && (
        <Modal
          closeIcon
          closeOnDimmerClick
          centered
          onClose={() => setShowModal(false)}
          open={showModal}
        >
          <Modal.Content scrolling>
            <MyRecipeModal recipe={recipe} user={user} />
          </Modal.Content>
        </Modal>
      )}

      <Divider hidden />
    </div>
  );
}

export default CardMyRecipe;
