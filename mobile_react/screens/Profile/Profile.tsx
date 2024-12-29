import { Suspense } from 'react';
import {
  gql,
  TypedDocumentNode,
  useMutation
} from '@apollo/client';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTheme } from '@/theme';
import { IconByVariant } from '@/components/atoms';

interface Data {
  addRecipe: {
    title: string;
    description: string;
  };
}

interface Variables {
  title: string;
  ingredients: Array<string>;
}

const GET_DOG_QUERY: TypedDocumentNode<Data, Variables> = gql`
    mutation AddRecipe($title: String!, $ingredients: [String!]!) {
        addRecipe(newRecipeData: { title: $title, ingredients: $ingredients, description: null }
        ) {
            title
            description
        }
    }
  `;

function Profile() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Dog id="3" />
    </Suspense>
  );
}
interface PostProps {
  id: string
}
function Dog({ id }: PostProps) {
  const {
    colors,
    variant,
    changeTheme,
    layout,
    gutters,
    fonts,
    components,
    backgrounds,
  } = useTheme();

  const [addTodo, { data, loading, error }] = useMutation(GET_DOG_QUERY, {
    variables: {
      title: "JEDI",
      ingredients: ["JEDI"]
    },
  })

  return (
    <TouchableOpacity
      onPress={() => addTodo({ variables: { title: "hihi", ingredients: ["hihi"] } })}
      style={[components.buttonCircle, gutters.marginBottom_16]}
      testID="change-theme-button"
    >
      <IconByVariant path={'theme'} stroke={colors.purple500} />
    </TouchableOpacity>
  );
}

export default Profile;
