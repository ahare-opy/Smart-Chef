import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Dropdown, Form } from 'semantic-ui-react';
import { possibleRecipe, searchMyRecipes } from '../utils/recipe';
import CardMyRecipe from '../components/Recipe/CardMyRecipe';

function RecipeSearch({ user }) {
  const [recipe, setRecipe] = useState([]);
  const [myRecipe, setMyRecipe] = useState([]);
  const [dietOptions, setDietOptions] = useState([]);
  const [diet, setDiet] = useState('');
  const [timeOptions, setTimeOptions] = useState([]);
  const [time, setTime] = useState();
  const [typeOptions, setTypeOptions] = useState([]);
  const [type, setType] = useState('');
  const [servingOptions, setServingOptions] = useState([]);
  const [serve, setServe] = useState();

  useEffect(() => {
    (async () => {
      let a = [
        {
          key: 'vegeterian',
          text: 'Vegeterian',
          value: 'vegeterian',
        },
        {
          key: 'non-veg',
          text: 'Nov Veg',
          value: 'non-veg',
        },
      ];

      setDietOptions(a);
    })();
  }, [dietOptions]);

  useEffect(() => {
    (async () => {
      let a = [
        5, 6, 7, 10, 15, 20, 25, 30, 40, 45, 50, 60, 65, 70, 80, 90, 100, 120,
        130, 150, 300,
      ];

      let b = [];

      for (let i = 0; i < a.length; i++) {
        let c = {
          key: a[i],
          text: `${a[i]} min`,
          value: a[i],
        };
        b.push(c);
      }

      setTimeOptions(b);
    })();
  }, [timeOptions]);

  useEffect(() => {
    (async () => {
      let a = [
        'breakfast',
        'dessert',
        'lunch,dinner',
        'snacks',
        'snacks,lunch,dinner',
      ];

      let b = [];

      for (let i = 0; i < a.length; i++) {
        let c = {
          key: a[i],
          text: `${a[i]}`,
          value: a[i],
        };
        b.push(c);
      }

      setTypeOptions(b);
    })();
  }, [typeOptions]);

  useEffect(() => {
    (async () => {
      let a = [1, 2, 3, 4, 5, 6, 8, 10, 14];

      let b = [];

      for (let i = 0; i < a.length; i++) {
        let c = {
          key: a[i],
          text: `${a[i]} persons`,
          value: a[i],
        };
        b.push(c);
      }

      setServingOptions(b);
    })();
  }, [servingOptions]);

  const handleDietChange = (e, { value }) => {
    e.preventDefault();
    setDiet(value);
  };

  const handleTimeChange = (e, { value }) => {
    e.preventDefault();
    setTime(value);
  };

  const handleTypeChange = (e, { value }) => {
    e.preventDefault();
    setType(value);
  };

  const handleServingChange = (e, { value }) => {
    e.preventDefault();
    setServe(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(user);

    searchMyRecipes(user, diet, time, type, serve, setRecipe);
  };

  return (
    <Container>
      <Form
        style={{
          margin: '3rem auto',
          width: '500px',
          padding: '1rem',
          border: '1px solid rgba(0, 0, 0, 0.1)',
        }}
        onSubmit={handleSubmit}
      >
        <Form.Group unstackable widths={2}>
          <Dropdown
            labeled
            placeholder="Ingredients"
            fluid
            search
            selection
            options={dietOptions}
            onChange={handleDietChange}
          />

          <Dropdown
            labeled
            placeholder="Cooking Time"
            fluid
            search
            selection
            options={timeOptions}
            onChange={handleTimeChange}
          />
        </Form.Group>

        <br />

        <Form.Group>
          <Dropdown
            labeled
            placeholder="Type"
            fluid
            search
            selection
            options={typeOptions}
            onChange={handleTypeChange}
          />

          <Dropdown
            labeled
            placeholder="Serving"
            fluid
            search
            selection
            options={servingOptions}
            onChange={handleServingChange}
          />
        </Form.Group>

        <Button
          type="submit"
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
        </Button>
      </Form>
      <br />

      <Card.Group>
        {recipe.length > 0 &&
          recipe.map((rec) => <CardMyRecipe recipe={rec} user={user} />)}
      </Card.Group>
    </Container>
  );
}

export default RecipeSearch;
