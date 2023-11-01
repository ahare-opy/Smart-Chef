import React, { useEffect, useState } from 'react';
import { Button, Container, Dropdown, Form } from 'semantic-ui-react';
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';
import { removeNull, removeZero, resetInventory } from '../utils/recipe';

function UpdateInventory({ user }) {
  const [ingredients, setIngredients] = useState([]);
  const [ingredients2, setIngredients2] = useState([]);
  const [editOptions, setEditOptions] = useState([]);
  const [val, setVal] = useState();
  const [name, setName] = useState('');

  useEffect(() => {
    (async () => {
      let m = JSON.parse(JSON.stringify(user.inventory));

      m = removeNull(m);

      m = removeZero(m);

      setIngredients(Object.keys(m));
      setIngredients2(Object.values(m));
    })();
  });

  useEffect(() => {
    (async () => {
      let m = JSON.parse(JSON.stringify(user.inventory));

      m = removeNull(m);

      m = removeZero(m);

      let n = Object.keys(m);

      let b = [];

      n.forEach((ing) => {
        let a = {
          key: ing,
          text: ing,
          value: ing,
        };

        b.push(a);
      });

      setEditOptions(b);
    })();
  });

  const handleIng = (e, { value }) => {
    e.preventDefault();

    setName(value);
  };

  const handleVal = (e, { value }) => {
    e.preventDefault();

    setVal(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    user.inventory[name] = Number(val);

    resetInventory(user);
  };

  return (
    <Container>
      <Box display="flex">
        <Box m="auto">
          <Stack direction="row" position={'center'}>
            <Box sx={{ border: 1 }}>
              <Table fluid>
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
              <Table fluid>
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
        </Box>
      </Box>

      <br />

      <Form
        onSubmit={handleSubmit}
        style={{
          margin: '3rem auto',
          width: '500px',
          padding: '1rem',
          border: '1px solid rgba(0, 0, 0, 0.1)',
        }}
      >
        <Dropdown
          placeholder="Ingredient Name"
          fluid
          search
          selection
          options={editOptions}
          onChange={handleIng}
        />

        <Form.Input
          placeholder="Input updated value"
          name="Input_updated_value"
          fluid
          required
          onChange={handleVal}
          type="number"
        />

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
          Update
        </button>
      </Form>
    </Container>
  );
}

export default UpdateInventory;
